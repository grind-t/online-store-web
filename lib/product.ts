import { Entity, Entities } from './utils';
import { doc, Firestore, getDoc } from '@firebase/firestore';
import { path } from 'app/firebase/firestore';

export type ProductVariantOptions = Record<string, string>;

export interface ProductVariant {
  image?: string;
  price: number;
  quantity: number;
  options: ProductVariantOptions;
}

export type ProductVariants = Entities<ProductVariant>;

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  name: string;
  description: string;
  image: string;
  options?: ProductOption[];
  variants: ProductVariants;
}

export function selectInitialProductOptions(
  options?: ProductOption[]
): ProductVariantOptions {
  const selected = {};
  if (!options) return selected;
  options.forEach((option) => (selected[option.name] = option.values[0]));
  return selected;
}

export function getVariant(
  variants: ProductVariants,
  options?: ProductVariantOptions
): Entity<ProductVariant> {
  const entries = Object.entries(variants);
  if (!options) return entries[0];
  const optionsNames = Object.keys(options);
  const entry = entries.find(([, variant]) =>
    optionsNames.every((name) => options[name] === variant.options[name])
  );
  return entry || ['', undefined];
}

export async function getProductFromFirestore(
  id: string,
  db: Firestore
): Promise<Product | null> {
  const snap = await getDoc(doc(db, path.products, id));
  return snap.exists() ? (snap.data() as Product) : null;
}
