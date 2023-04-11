import { WithId } from "@/utils/types";
import { ReactNode } from "react";

type Sizes = "xs" | "sm" | "md" | "lg";

export type HidableSizesProps = {
  [key in `${Sizes}Hidden`]?: boolean;
};

type Cells = Array<WithId<{ content: ReactNode | string } & HidableSizesProps>>;
type Rows = Array<WithId<{ cells: Cells }>>;

export type CommonProps = {
  tabs: Array<{ content: string } & HidableSizesProps>;
  rows: Rows;
  itemsPerPage: number;
};
