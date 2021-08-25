import { ProductWithVariants, getVariantsFromFirestore } from './product';
import {
  collection,
  getAppFirestore,
  getDocs,
  path,
} from 'app/firebase/firestore';

export type ProductsWithVariants = Record<string, ProductWithVariants>;

export async function getProductsWithVariantsFromFirestore(): Promise<ProductsWithVariants> {
  const snap = await getDocs(collection(getAppFirestore(), path.products));
  const productsWithVariants = {};
  for (const doc of snap.docs) {
    const product = { id: doc.id, ...doc.data() };
    const variants = await getVariantsFromFirestore(doc.ref);
    productsWithVariants[product.id] = [product, variants];
  }
  return productsWithVariants;
}
