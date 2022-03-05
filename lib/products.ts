import { supabase } from 'lib/supabase';

export interface ProductVariantEntity {
  id: number;
  productId: number;
  price: number;
  stock: number;
  sales: number;
  characteristics: Record<string, string>;
}

export interface ProductEntity {
  id: number;
  image: string;
  name: string;
  description: string;
  characteristics: Record<string, string>;
}

export interface ProductVariant extends ProductVariantEntity {
  product: ProductEntity;
}

export interface Product extends ProductEntity {
  variants: ProductVariantEntity[];
}

export const productVariantTable = 'product_variants';
export const productTable = 'products';

export const productVariantEntityQuery = `
  id,
  productId:product_id,
  price,
  stock,
  sales,
  characteristics
`;

export const productEntityQuery = `
  id,
  image,
  name,
  description,
  characteristics
`;

export const productVariantQuery = `
  ${productVariantEntityQuery},
  product:${productTable}(${productEntityQuery})
`;

export const productQuery = `
  ${productEntityQuery},
  variants:${productVariantTable}(${productVariantEntityQuery})
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
  variants: ProductVariantEntity[],
  characteristics: Record<string, string>
): ProductVariantEntity | undefined {
  const keys = Object.keys(characteristics);
  return variants.find((variant) =>
    keys.every((key) => characteristics[key] === variant.characteristics[key])
  );
}
