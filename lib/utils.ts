export type EntityId = string;

export type Entity<T> = [EntityId, T];

export type Entities<T> = Record<EntityId, T>;
