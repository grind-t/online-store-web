import { supabase } from 'lib/supabase';

export interface ProductVariant {
  id: number;
  productId: number;
  price: number;
  stock: number;
  sales: number;
  characteristics: Record<string, string>;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  characteristics: Record<string, string>;
}

export interface ProductVariantFull extends ProductVariant {
  product: Product;
}

export interface ProductFull extends Product {
  variants: ProductVariant[];
}

export enum SortBy {
  Popularity,
  Price,
  Alphabet,
}

export const productVariantTable = 'product_variants';
export const productTable = 'products_view';

export const productVariantQuery = `
  id,
  productId:product_id,
  price,
  stock,
  sales,
  characteristics
`;

export const productQuery = `
  id,
  image,
  name,
  description,
  characteristics
`;

export const productVariantFullQuery = `
  ${productVariantQuery},
  product:${productTable}(${productQuery})
`;

export const productFullQuery = `
  ${productQuery},
  variants:${productVariantTable}(${productVariantQuery})
`;

export async function getProducts(
  sortBy: SortBy,
  sortAscending?: boolean
): Promise<ProductFull[]> {
  const sortByColumns = ['sales', 'min_price', 'name'];
  const sortByColumn = sortByColumns[sortBy];
  const { data, error } = await supabase
    .from(productTable)
    .select(productFullQuery)
    .order(sortByColumn, { ascending: sortAscending });
  if (error) throw new Error(error.message);
  return data || [];
}

export function getProductOptions(
  product: ProductFull
): Record<string, string[]> {
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
