import { Entities, Entity } from './entities';
import { Product, ProductVariant } from 'api/products';

export function getProductOptions(product: Product): Record<string, string[]> {
  const options: Record<string, string[]> = {};
  const variants = Object.values(product.variants);
  const keys = Object.keys(variants[0].characteristics);
  for (const key of keys) {
    const values = new Set<string>();
    for (const variant of variants) {
      values.add(variant.characteristics[key]);
    }
    options[key] = Array.from(values);
  }
  return options;
}

export function getVariant(
  variants: Entities<ProductVariant>,
  characteristics: Record<string, string>
): Entity<ProductVariant> | undefined {
  const entries = Object.entries(variants);
  const keys = Object.keys(characteristics);
  return entries.find(([, varinat]) =>
    keys.every((key) => characteristics[key] === varinat.characteristics[key])
  );
}
