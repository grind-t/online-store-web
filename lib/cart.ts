import { Unsubscribe } from 'app/firebase/auth';
import {
  doc,
  setDoc,
  onSnapshot,
  getAppFirestore,
  collection,
  deleteDoc,
  writeBatch,
  path,
} from 'app/firebase/firestore';
import { User } from 'lib/user';

export interface LineItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export type Cart = Record<string, LineItem>;
export type CartChangedCallback = (cart: Cart) => void;

export function getLocalCart(): Cart {
  const cartJSON = window.localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : {};
}

export function getLineItemFromLocalCart(itemId: string): LineItem | null {
  const cart = getLocalCart();
  return cart[itemId] || null;
}

export function handleLocalLineItemChange(
  itemId: string,
  item: LineItem
): void {
  const cart = getLocalCart();
  if (item.quantity <= 0) delete cart[itemId];
  else cart[itemId] = item;
  window.dispatchEvent(new CustomEvent('local-cart', { detail: cart }));
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function handleFirestoreLineItemChange(
  itemId: string,
  item: LineItem,
  user: User
): void {
  const db = getAppFirestore();
  const itemRef = doc(db, path.customers, user.id, path.cart, itemId);
  if (item.quantity <= 0) deleteDoc(itemRef).catch(console.error);
  else setDoc(itemRef, item).catch(console.error);
}

export function handleLineItemChange(
  itemId: string,
  item: LineItem,
  user: User
): void {
  if (user) handleFirestoreLineItemChange(itemId, item, user);
  else handleLocalLineItemChange(itemId, item);
}

export function clearLocalCart() {
  window.localStorage.removeItem('cart');
}

export function mergeLocalCartWithFirestore(user: User): Promise<void> {
  const localItems = Object.entries(getLocalCart());
  if (!localItems.length) return Promise.resolve();
  const db = getAppFirestore();
  const cartRef = collection(db, path.customers, user.id, path.cart);
  const batch = writeBatch(db);
  for (const [id, item] of localItems) {
    const docRef = doc(cartRef, id);
    batch.set(docRef, item, { merge: true });
  }
  return batch.commit();
}

export function onLocalCartChange(cb: CartChangedCallback): Unsubscribe {
  cb(getLocalCart());
  const listener = (e: CustomEvent) => cb(e.detail);
  window.addEventListener('local-cart', listener);
  return () => window.removeEventListener('local-cart', listener);
}

export function onFirestoreCartChange(
  user: User,
  cb: CartChangedCallback
): Unsubscribe {
  const ref = collection(getAppFirestore(), path.customers, user.id, path.cart);
  return onSnapshot(
    ref,
    (snap) => {
      const cart = {};
      for (const doc of snap.docs) {
        cart[doc.id] = doc.data();
      }
      cb(cart);
    },
    console.error
  );
}

export function onCartChange(user: User, cb: CartChangedCallback): Unsubscribe {
  if (!user) return onLocalCartChange(cb);
  mergeLocalCartWithFirestore(user).then(clearLocalCart).catch(console.error);
  return onFirestoreCartChange(user, cb);
}
