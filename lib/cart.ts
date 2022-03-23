import { User } from 'lib/auth';
import {
  ProductVariantFull,
  productVariantFullQuery,
  productVariantTable,
} from 'lib/products';
import { supabase } from 'lib/supabase';

export interface LineItem {
  variantId: number;
  quantity: number;
}

export interface LineItemFull extends LineItem {
  variant: ProductVariantFull;
}

export interface Cart {
  items: LineItemFull[];
}

interface LocalCart {
  items: Record<string, LineItem>;
}

const cartItemTable = 'cart_items';
const cartTable = 'carts';
const localCartKey = 'cart';

export const lineItemQuery = `
  variantId:variant_id,
  quantity
`;

export const lineItemFullQuery = `
  ${lineItemQuery},
  variant:${productVariantTable}(${productVariantFullQuery})
`;

const cartQuery = `
  items:${cartItemTable}(${lineItemFullQuery})
`;

export function getEmptyCart(): Cart {
  return { items: [] };
}

function getLocalCart(): LocalCart {
  const json = localStorage.getItem(localCartKey);
  return json ? JSON.parse(json) : { items: {} };
}

function setLocalCart(cart: LocalCart) {
  localStorage.setItem(localCartKey, JSON.stringify(cart));
}

function clearLocalCart(): void {
  localStorage.removeItem(localCartKey);
}

async function mergeLocalCart(): Promise<void> {
  const localCart = getLocalCart();
  const { error } = await supabase.rpc<Cart>('merge_cart', {
    cart_input: {
      ...localCart,
      items: Object.values(localCart.items),
    },
  });
  if (error) throw new Error(error.message);
  clearLocalCart();
}

async function getCartFromLocalStorage(): Promise<Cart> {
  const items = getLocalCart().items;
  const ids = Object.values(items).map((v) => v.variantId);
  const { data, error } = await supabase
    .from<ProductVariantFull>(productVariantTable)
    .select(productVariantFullQuery)
    .in('id', ids);
  if (error) throw new Error(error.message);
  if (!data) return getEmptyCart();
  return {
    items: data.map((variant) => ({
      variantId: variant.id,
      quantity: items[variant.id].quantity,
      variant,
    })),
  };
}

async function getCartFromDatabase(): Promise<Cart> {
  const { data, error } = await supabase
    .from<Cart>(cartTable)
    .select(cartQuery);
  if (error) throw new Error(error.message);
  return data ? data[0] : getEmptyCart();
}

export async function getCart(user?: User): Promise<Cart> {
  if (user) await mergeLocalCart();
  return user ? getCartFromDatabase() : getCartFromLocalStorage();
}

export async function setCartItem(item: LineItem, user?: User): Promise<void> {
  if (user) {
    const { error } = await supabase.from(cartItemTable).upsert(
      {
        user_id: user.id,
        variant_id: item.variantId,
        quantity: item.quantity,
      },
      { returning: 'minimal' }
    );
    if (error) throw new Error(error.message);
  } else {
    const localCart = getLocalCart();
    setLocalCart({
      ...localCart,
      items: {
        ...localCart.items,
        [item.variantId]: item,
      },
    });
  }
}

export async function removeCartItem(
  variantId: number,
  user?: User
): Promise<void> {
  if (user) {
    const { error } = await supabase
      .from(cartItemTable)
      .delete({ returning: 'minimal' })
      .match({ variant_id: variantId });
    if (error) throw new Error(error.message);
  } else {
    const localCart = getLocalCart();
    const { [variantId]: omit, ...rest } = localCart.items;
    setLocalCart({
      ...localCart,
      items: rest,
    });
  }
}

export async function clearCart(user?: User): Promise<void> {
  if (user) {
    const { error } = await supabase
      .from(cartTable)
      .delete()
      .match({ user_id: user.id });
    if (error) throw new Error(error.message);
  } else {
    clearLocalCart();
  }
}
