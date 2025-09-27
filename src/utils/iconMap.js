import * as PhosphorIcons from "phosphor-react";

export function getIconComponent(iconName) {
  return PhosphorIcons[iconName] || PhosphorIcons["Question"];
}
