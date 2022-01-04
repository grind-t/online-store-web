import { supabase } from 'app/supabase-client';
import { ID, Entities } from 'lib/entities';
import { Nullish, Modify } from 'lib/utils';

export interface ProductVariant {
  id: ID;
  stock: number;
  price: number;
  characteristics: Record<string, string>;
}

export interface Product {
  id: ID;
  image: string;
  name: string;
  description: string;
  characteristics: Record<string, string>;
  variants: Entities<ProductVariant>;
}

type ApiProduct = Modify<Product, { variants: ProductVariant[] }>;

function productFromApi(product: ApiProduct): Product {
  return {
    ...product,
    variants: product.variants.reduce((variants, variant) => {
      variants[variant.id] = variant;
      return variants;
    }, {} as Entities<ProductVariant>),
  };
}

function productsFromApi(products: ApiProduct[]): Entities<Product> {
  return products.reduce((products, product) => {
    products[product.id] = productFromApi(product);
    return products;
  }, {} as Entities<Product>);
}

export async function getProduct(id: ID): Promise<Product | Nullish> {
  const { data, error } = await supabase.rpc('get_product', { id }).single();
  if (error) throw new Error(error.message);
  return data && productFromApi(data);
}

export async function getProducts(): Promise<Entities<Product>> {
  const { data, error } = await supabase.rpc('get_products');
  if (error) throw new Error(error.message);
  return (data && productsFromApi(data)) || {};
}
