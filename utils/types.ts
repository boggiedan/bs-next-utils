export type Nullable<T> = T | null | undefined;
export type WithId<T, ID = string> = T & { id: ID };
