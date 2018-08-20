import { Value } from "slate";
import { TypeOptions } from "../options";

export default function createUtils(opts: TypeOptions) {
  const { defaultColor, data, type } = opts;
  return {
    currentColor: (value: Value) => {
      if (value.selection && value.selection.isFocused && value.activeMarks) {
        const activeColorMarks = value.activeMarks
          .filter(mark => mark.type === type)
          .map(mark => mark.data.get(data));
        const uniqueColorMarks = [...Array.from(new Set(activeColorMarks))];
        if (uniqueColorMarks.length !== 0) {
          return uniqueColorMarks[0];
        }
      }
      return defaultColor;
    }
  };
}
