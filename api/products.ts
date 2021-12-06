import {
  getDoc,
  doc,
  getDocs,
  collection,
  getAppFirestore,
  path,
} from 'app/firebase/firestore';
import { Entities, ID } from 'lib/entities';

export interface ProductVariant {
  order: number;
  stock: number;
  price: number;
  characteristics: Record<string, string>;
}

export interface Product {
  image: string;
  name: string;
  description: string;
  characteristics: Record<string, string>;
  variants: Entities<ProductVariant>;
}

export async function getProduct(id: ID): Promise<Product | undefined> {
  const db = getAppFirestore();
  const snap = await getDoc(doc(db, path.products, <string>id));
  return <Product | undefined>snap.data();
}

export async function getProducts(): Promise<Entities<Product>> {
  const db = getAppFirestore();
  const snap = await getDocs(collection(db, path.products));
  const products: Entities<Product> = {};
  snap.forEach((doc) => (products[doc.id] = <Product>doc.data()));
  return products;
}
