import { Entity, Entities } from './utils';
import { doc, Firestore, getDoc } from '@firebase/firestore';
import { path } from 'app/firebase/firestore';

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export type SelectedOptions = Record<string, string>;

export interface ProductVariant {
  options: SelectedOptions;
  image?: ProductImage;
  price: number;
  quantity: number;
}

export type ProductVariants = Entities<ProductVariant>;

export interface Product {
  name: string;
  description: string;
  image: ProductImage;
  price: number;
  options?: ProductOption[];
  variants: ProductVariants;
}

export function selectInitialOptions(
  options?: ProductOption[]
): SelectedOptions | null {
  if (!options) return null;
  const selected = {};
  options.forEach((option) => (selected[option.name] = option.values[0]));
  return selected;
}

export function getVariant(
  variants: ProductVariants,
  selectedOptions?: SelectedOptions
): Entity<ProductVariant> {
  const entries = Object.entries(variants);
  if (!selectedOptions) return entries[0];
  const names = Object.keys(selectedOptions);
  return entries.find(([id, variant]) =>
    names.every((name) => selectedOptions[name] === variant.options[name])
  );
}

export async function getProductFromFirestore(
  id: string,
  db: Firestore
): Promise<Product | null> {
  const snap = await getDoc(doc(db, path.products, id));
  return snap.exists() ? (snap.data() as Product) : null;
}
