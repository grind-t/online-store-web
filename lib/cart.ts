import { Dinero, dinero, add, multiply } from 'dinero.js';
import { User } from 'lib/auth';
import { zeroDinero, defaultCurrency } from 'lib/money';
import { productTable, productVariantTable } from 'lib/products';
import { supabase } from 'lib/supabase';

export interface LineItemProduct {
  id: number;
  image: string;
  name: string;
  description: string;
}

export interface LineItemProductVariant {
  id: number;
  stock: number;
  price: number;
  characteristics: Record<string, string>;
  product: LineItemProduct;
}

export interface LineItem {
  variant: LineItemProductVariant;
  quantity: number;
}

export interface Cart {
  items: LineItem[];
}

export interface LineItemEntity {
  variantId: number;
  quantity: number;
}

interface LocalCart {
  items: Record<string, LineItemEntity>;
}

const cartItemTable = 'cart_items';
const cartTable = 'carts';
const localCartKey = 'cart';

export const lineItemProductQuery = `
  id,
  image,
  name,
  description
`;

export const lineItemProductVariantQuery = `
  id,
  stock,
  price,
  sales,
  characteristics,
  product:${productTable}(${lineItemProductQuery})
`;

export const lineItemQuery = `
  variant:${productVariantTable}(${lineItemProductVariantQuery}),
  quantity
`;

const cartQuery = `
  items:${cartItemTable}(${lineItemQuery})
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
    .from<LineItemProductVariant>(productVariantTable)
    .select(lineItemProductVariantQuery)
    .in('id', ids);
  if (error) throw new Error(error.message);
  if (!data) return getEmptyCart();
  return {
    items: data.map((variant) => ({
      variant,
      quantity: items[variant.id].quantity,
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

export async function setCartItem(
  item: LineItem | LineItemEntity,
  user?: User
): Promise<void> {
  if ('variant' in item) {
    item = { variantId: item.variant.id, quantity: item.quantity };
  }
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

export function getItemCount(items: LineItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(items: LineItem[]): Dinero<number> {
  return items.reduce((total, item) => {
    const variantPrice = dinero({
      amount: item.variant.price,
      currency: defaultCurrency,
    });
    const itemPrice = multiply(variantPrice, item.quantity);
    return add(total, itemPrice);
  }, zeroDinero);
}
