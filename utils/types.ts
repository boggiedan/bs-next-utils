import { FC, ReactNode } from "react";

export type Nullable<T> = T | null | undefined;
export type WithId<T, ID = string> = T & { id: ID };
export type FCWithChildren<T = {}> = FC<T & { children: ReactNode }>;
