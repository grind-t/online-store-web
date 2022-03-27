import { supabase } from 'lib/supabase';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

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

export interface Category {
  id: number;
  name: string;
}

export enum SortProductsBy {
  Popularity,
  Price,
  Alphabet,
}

export interface ProductSearchParams {
  sortBy: SortProductsBy;
  sortAscending?: boolean;
  categoryId: number;
}

export const productVariantTable = 'product_variants';
export const productTable = 'products_view';
export const categoryTable = 'categories';

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

export const categoryQuery = `
  id,
  name
`;

export const categoryProductsQuery = `
  products:${productTable}(${productFullQuery})
`;

export async function getProducts({
  sortBy,
  sortAscending,
  categoryId,
}: ProductSearchParams): Promise<ProductFull[]> {
  const sortingColumns = ['sales', 'min_price', 'name'];
  const sortingColumn = sortingColumns[sortBy];
  if (categoryId) {
    const { data, error } = await supabase
      .from(categoryTable)
      .select(categoryProductsQuery)
      .eq('id', categoryId)
      .order(sortingColumn, {
        ascending: sortAscending,
        foreignTable: productTable,
      })
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? data.products : [];
  }
  const { data, error } = await supabase
    .from(productTable)
    .select(productFullQuery)
    .order(sortingColumn, { ascending: sortAscending });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from(categoryTable)
    .select(categoryQuery);
  if (error) throw new Error(error.message);
  return data;
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

export function getProductSearchParams(
  query: ParsedUrlQuery
): ProductSearchParams {
  const sortBy = Number.parseInt(query['sort-by'] as any) || 0;
  const sortAscending = query['sort-asc'] !== undefined;
  const categoryId = Number.parseInt(query['category-id'] as any);
  return { sortBy, sortAscending, categoryId };
}

export function getProductSearchQuery({
  sortBy,
  sortAscending,
  categoryId,
}: ProductSearchParams): ParsedUrlQueryInput {
  const query = {} as ParsedUrlQueryInput;
  if (sortBy) query['sort-by'] = sortBy;
  if (sortAscending) query['sort-asc'] = sortAscending;
  if (categoryId) query['category-id'] = categoryId;
  return query;
}
