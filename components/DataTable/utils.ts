import { HidableSizesProps } from "@/components/DataTable/types";

export const getHideableClasses = (sizes: HidableSizesProps) =>
  Object.keys(sizes)
    .map((key) => {
      const size = key.slice(0, 2);

      return `max-${size}:hidden`;
    })
    .join(" ");
