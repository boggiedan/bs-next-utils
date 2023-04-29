import { config, IconDefinition, library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const libNecessaryIcons: IconDefinition[] = [faBars, faClose];

export const createConfig = (iconDefinitions: IconDefinition[] = []) => {
  config.autoAddCss = false;

  const allIcons = [...libNecessaryIcons, ...iconDefinitions];
  const iconNames = [...new Set(allIcons.map((icon) => icon.iconName))];
  const icons = iconNames.map(
    (name) => allIcons.find((icon) => icon.iconName === name) as IconDefinition
  );

  library.add(...icons);
};
