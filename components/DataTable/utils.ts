import { HidableSizesProps } from "@/components/DataTable/types";

const hideFromLg: HidableSizesProps = {
  lgHidden: true,
  mdHidden: true,
  smHidden: true,
  xsHidden: true,
};

const hideFromMd: HidableSizesProps = {
  mdHidden: true,
  smHidden: true,
  xsHidden: true,
};

const hideFromSm: HidableSizesProps = {
  smHidden: true,
  xsHidden: true,
};

const makeHideClass = (sizes: HidableSizesProps) => {
  return Object.keys(sizes)
    .map((key) => {
      const size = key.slice(0, 2);

      return `max-${size}:hidden`;
    })
    .join(" ");
};

export const getHideableClasses = (sizes: HidableSizesProps) => {
  if (sizes.lgHidden) {
    return makeHideClass(hideFromLg);
  }

  if (sizes.mdHidden) {
    return makeHideClass(hideFromMd);
  }

  if (sizes.smHidden) {
    return makeHideClass(hideFromSm);
  }

  return makeHideClass(sizes);
};
