import { WithId } from "@/utils/types";
import { ReactNode } from "react";

export type Sizes = "sm" | "md" | "lg" | "xl" | "2xl";

type HideFromSizeProp = {
  hideFrom?: Sizes;
};

type Cells = Array<WithId<{ content: ReactNode | string } & HideFromSizeProp>>;
type Rows = Array<WithId<{ cells: Cells }>>;

export type CommonProps = {
  tabs: Array<{ content: string } & HideFromSizeProp>;
  rows: Rows;
  itemsPerPage: number;
};
