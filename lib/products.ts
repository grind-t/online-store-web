import { Product } from './product';
import {
  collection,
  getAppFirestore,
  getDocs,
  path,
} from 'app/firebase/firestore';

export type Products = Record<string, Product>;

export async function getProductsFromFirestore(): Promise<Products> {
  const snap = await getDocs(collection(getAppFirestore(), path.products));
  const products = {};
  snap.forEach((doc) => (products[doc.id] = doc.data()));
  return products;
}
