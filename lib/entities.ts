export type ID = number | string;

export type Entity<T> = [ID, T];

export type Entities<T> = Record<ID, T>;
