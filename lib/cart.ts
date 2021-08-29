import { Entities } from './utils';
import { getAppAuth } from 'app/firebase/auth';
import {
  doc,
  setDoc,
  getAppFirestore,
  path,
  getDoc,
  Firestore,
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

export async function getFirestoreCart(
  userId: string,
  db: Firestore
): Promise<Cart> {
  const snap = await getDoc(doc(db, path.carts, userId));
  const cart = snap.exists() ? snap.data() : getEmptyCart();
  return cart as Cart;
}

export async function getAppCart(): Promise<Cart> {
  const user = getAppAuth().currentUser;
  const localCart = getLocalCart();
  if (!user) return Promise.resolve(localCart);
  const db = getAppFirestore();
  if (!isCartEmpty(localCart)) {
    await setDoc(doc(db, path.carts, user.uid), localCart, { merge: true })
      .then(clearLocalCart)
      .catch(console.error);
  }
  return getFirestoreCart(user.uid, db);
}

export function setLocalCart(cart: Cart): void {
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function setFirestoreCart(
  cart: Cart,
  userId: string,
  db: Firestore
): Promise<void> {
  return setDoc(doc(db, path.carts, userId), cart);
}

export function setAppCart(cart: Cart): Promise<void> {
  const user = getAppAuth().currentUser;
  return user
    ? setFirestoreCart(cart, user.uid, getAppFirestore())
    : Promise.resolve(setLocalCart(cart));
}

export function clearLocalCart() {
  window.localStorage.removeItem('cart');
}
