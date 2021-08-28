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

export type SelectedOptions = Record<string, string>;

export interface ProductVariant {
  options: Record<string, string>;
  image?: ProductImage;
  price?: ProductPrice;
  quantity: number;
}

export type ProductVariants = Record<string, ProductVariant>;

export interface Product {
  name: string;
  description: string;
  image: ProductImage;
  price: ProductPrice;
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
): [string, ProductVariant] {
  const entries = Object.entries(variants);
  if (!selectedOptions) return entries[0];
  const names = Object.keys(selectedOptions);
  return entries.find(([id, variant]) =>
    names.every((name) => selectedOptions[name] === variant.options[name])
  );
}
