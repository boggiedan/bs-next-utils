import { Sizes } from "@/components/DataTable/types";

export const hideClasses: {
  [key in Sizes]: `max-${Sizes}:hidden`;
} = {
  sm: "max-sm:hidden",
  md: "max-md:hidden",
  lg: "max-lg:hidden",
  xl: "max-xl:hidden",
  "2xl": "max-2xl:hidden",
};
