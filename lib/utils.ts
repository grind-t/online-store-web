export type EntityId = string;

export type Entity<T> = [EntityId, T];

export type Entities<T> = Record<EntityId, T>;

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
