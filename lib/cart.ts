import { Entities } from './utils';
import { getAppAuth } from 'app/firebase/auth';
import {
  doc,
  setDoc,
  getAppFirestore,
  path,
  getDoc,
} from 'app/firebase/firestore';

export interface LineItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export type LineItems = Entities<LineItem>;

export interface Cart {
  items: LineItems;
}

export function isCartEmpty(cart: Cart): boolean {
  return Object.keys(cart.items).length <= 0;
}

export function getEmptyCart(): Cart {
  return { items: {} };
}

export function getLocalCart(): Cart {
  const cartJSON = window.localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : getEmptyCart();
}

export async function getFirestoreCart(userId: string): Promise<Cart> {
  const snap = await getDoc(doc(getAppFirestore(), path.carts, userId));
  const cart = snap.exists() ? snap.data() : getEmptyCart();
  return cart as Cart;
}

export async function getCart(): Promise<Cart> {
  const user = getAppAuth().currentUser;
  if (!user) return Promise.resolve(getLocalCart());
  await mergeLocalCartWithFirestore(user.uid)
    .then(clearLocalCart)
    .catch(console.error);
  return getFirestoreCart(user.uid);
}

export function setLocalCart(cart: Cart): void {
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function setFirestoreCart(cart: Cart, userId: string): Promise<void> {
  return setDoc(doc(getAppFirestore(), path.carts, userId), cart);
}

export function setCart(cart: Cart): Promise<void> {
  const user = getAppAuth().currentUser;
  return user
    ? setFirestoreCart(cart, user.uid)
    : Promise.resolve(setLocalCart(cart));
}

export function clearLocalCart() {
  window.localStorage.removeItem('cart');
}

function mergeLocalCartWithFirestore(userId: string): Promise<void> {
  const localCart = getLocalCart();
  if (isCartEmpty(localCart)) return Promise.resolve();
  const db = getAppFirestore();
  return setDoc(doc(db, path.carts, userId), localCart, { merge: true });
}
