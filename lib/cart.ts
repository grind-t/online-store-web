import { Entities } from './entities';
import { defaultCurrency, zeroDinero } from './money';
import { Cart, CartItem } from 'api/cart';
import { Product } from 'api/products';
import { add, Dinero, dinero, multiply } from 'dinero.js';

export function getEmptyCart(): Cart {
  return { items: {} };
}

export function isCartEmpty(cart: Cart): boolean {
  return Object.keys(cart.items).length <= 0;
}

export function getLocalCart(): Cart {
  const json = window.localStorage.getItem('cart');
  return json ? JSON.parse(json) : getEmptyCart();
}

export function setLocalCart(cart: Cart): void {
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function clearLocalCart() {
  window.localStorage.removeItem('cart');
}

export function mergeCarts(source: Cart, target: Cart): Cart {
  return { items: { ...target.items, ...source.items } };
}

export function getTotalCartItems(cart: Cart): number {
  return Object.values(cart.items).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
}

export function getCartItemPrice(
  item: CartItem,
  product: Product
): Dinero<number> {
  const variant = product.variants[item.variantId];
  const d = dinero({ amount: variant.price, currency: defaultCurrency });
  return multiply(d, item.quantity);
}

export function getTotalCartPrice(
  cart: Cart,
  products: Entities<Product>
): Dinero<number> {
  return Object.values(cart.items).reduce((acc, item) => {
    const product = products[item.productId];
    return product ? add(acc, getCartItemPrice(item, product)) : zeroDinero;
  }, zeroDinero);
}
