export type Nullish = null | undefined;

export type Modify<T, R> = Omit<T, keyof R> & R;
