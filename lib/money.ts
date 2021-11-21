import { RUB } from '@dinero.js/currencies';
import { Dinero, dinero, toFormat } from 'dinero.js';

export const defaultLocale = 'ru';
export const defaultCurrency = RUB;
export const zeroDinero = dinero({ amount: 0, currency: defaultCurrency });

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
