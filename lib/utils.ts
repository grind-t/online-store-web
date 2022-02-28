export type ID = number | string;

export type Nullish = null | undefined;

export type Modify<T, R> = Omit<T, keyof R> & R;

export function noop() {}

export const isBrowser = typeof window !== 'undefined';

export function pick<T extends object, K extends (keyof T)[]>(
  obj: T,
  ...keys: K
): Pick<T, K[number]> {
  return keys.reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {} as any);
}
