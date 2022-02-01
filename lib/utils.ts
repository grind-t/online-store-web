export type ID = number | string;

export type Nullish = null | undefined;

export type Modify<T, R> = Omit<T, keyof R> & R;

export function noop() {}

export const isBrowser = typeof window !== 'undefined';
