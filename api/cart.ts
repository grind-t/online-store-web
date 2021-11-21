import { getAppAuth } from 'app/firebase/auth';
import {
  getAppFirestore,
  getDoc,
  setDoc,
  doc,
  path,
} from 'app/firebase/firestore';
import { Entities, ID } from 'lib/entities';

export interface CartItem {
  productId: ID;
  variantId: ID;
  quantity: number;
}

export interface Cart {
  items: Entities<CartItem>;
}

export async function getCart(): Promise<Cart | undefined> {
  const db = getAppFirestore();
  const user = getAppAuth().currentUser;
  if (!user) return undefined;
  const snap = await getDoc(doc(db, path.carts, user.uid));
  return <Cart | undefined>snap.data();
}

export function setCart(cart: Cart): Promise<void> {
  const db = getAppFirestore();
  const user = getAppAuth().currentUser;
  if (!user) return Promise.reject('unauthorized');
  return setDoc(doc(db, path.carts, user.uid), cart);
}
