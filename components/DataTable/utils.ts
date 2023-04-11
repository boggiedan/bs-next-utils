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

const makeHideClasses = (sizes: HidableSizesProps) => {
  return Object.keys(sizes)
    .map((key) => {
      const size = key.slice(0, 2);

      return `max-${size}:hidden`;
    })
    .join(" ");
};

export const getHideableClasses = (sizes: HidableSizesProps) => {
  if (sizes.lgHidden) {
    return makeHideClasses(hideFromLg);
  }

  if (sizes.mdHidden) {
    return makeHideClasses(hideFromMd);
  }

  if (sizes.smHidden) {
    return makeHideClasses(hideFromSm);
  }

  return makeHideClasses(sizes);
};
