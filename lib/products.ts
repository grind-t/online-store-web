import { supabase } from 'lib/supabase';

export interface ProductVariant {
  id: number;
  stock: number;
  price: number;
  characteristics: Record<string, string>;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  characteristics: Record<string, string>;
  variants: ProductVariant[];
}

export const productVariantTable = 'product_variants';
export const productTable = 'products';

const productVariantQuery = `
  id,
  stock,
  price,
  characteristics
`;

const productQuery = `
  id,
  image,
  name,
  description,
  characteristics,
  variants:${productVariantTable}(${productVariantQuery})
`;

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from<Product>(productTable)
    .select(productQuery);
  if (error) throw new Error(error.message);
  return data || [];
}

export function getProductOptions(product: Product): Record<string, string[]> {
  const options: Record<string, string[]> = {};
  const variants = product.variants;
  const keys = Object.keys(variants[0].characteristics);
  for (const key of keys) {
    const values = new Set<string>();
    for (const variant of variants) values.add(variant.characteristics[key]);
    options[key] = Array.from(values);
  }
  return options;
}

export function findVariant(
  variants: ProductVariant[],
  characteristics: Record<string, string>
): ProductVariant | undefined {
  const keys = Object.keys(characteristics);
  return variants.find((variant) =>
    keys.every((key) => characteristics[key] === variant.characteristics[key])
  );
}
