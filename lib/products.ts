import { Product } from './product';
import { Entities } from './utils';
import {
  collection,
  getAppFirestore,
  getDocs,
  path,
} from 'app/firebase/firestore';

export type Products = Entities<Product>;

export async function getProductsFromFirestore(): Promise<Products> {
  const snap = await getDocs(collection(getAppFirestore(), path.products));
  const products = {};
  snap.forEach((doc) => (products[doc.id] = doc.data()));
  return products;
}
