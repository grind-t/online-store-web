import {
  DocumentReference,
  getDocs,
  path,
  collection,
} from 'app/firebase/firestore';

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductPrice {
  value: number;
  currency: 'RUB';
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  options: Record<string, string>;
  image?: ProductImage;
  price?: ProductPrice;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: ProductImage;
  price: ProductPrice;
  options?: ProductOption[];
}

export type ProductVariants = Record<string, ProductVariant>;

export type ProductWithVariants = [Product, ProductVariants];

export type SelectedOptions = Record<string, string>;

export function selectInitialOptions(
  options?: ProductOption[]
): SelectedOptions | null {
  if (!options) return null;
  const selected = {};
  options.forEach((option) => (selected[option.name] = option.values[0]));
  return selected;
}

export function getVariant(
  variants: ProductVariant[],
  selectedOptions?: Record<string, string>
): ProductVariant {
  if (!selectedOptions) return variants[0];
  const keys = Object.keys(selectedOptions);
  return variants.find((variant) =>
    keys.every((key) => selectedOptions[key] === variant.options[key])
  );
}

export async function getVariantsFromFirestore(
  productDocRef: DocumentReference
): Promise<ProductVariants> {
  const snap = await getDocs(collection(productDocRef, path.variants));
  const variants = {};
  snap.forEach((doc) => (variants[doc.id] = { id: doc.id, ...doc.data() }));
  return variants;
}
