import { Cart, LineItem } from './cart';
import { Products } from './products';
import { RUB } from '@dinero.js/currencies';
import { add, Dinero, dinero, multiply, toFormat } from 'dinero.js';

export const defaultLocale = 'ru';
export const defaultCurrency = RUB;
const zeroDinero = dinero({ amount: 0, currency: defaultCurrency });

export function getLineItemPrice(
  item: LineItem,
  products: Products
): Dinero<number> {
  const product = products[item.productId];
  if (!product) return zeroDinero;
  const variant = product.variants[item.variantId];
  const price = variant.price || product.price;
  const d = dinero({ amount: price, currency: defaultCurrency });
  return multiply(d, item.quantity);
}

export function getCartPrice(cart: Cart, products: Products): Dinero<number> {
  return Object.values(cart.items).reduce(
    (acc, item) => add(acc, getLineItemPrice(item, products)),
    zeroDinero
  );
}

export function formatPrice(value: Dinero<number>): string {
  return toFormat(value, ({ amount, currency }) =>
    new Intl.NumberFormat(defaultLocale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      useGrouping: false,
    }).format(amount)
  );
}
