import { Value, Mark } from "slate";
import { TypeOptions } from "../options";

export default function createUtils(opts: TypeOptions) {
  const { defaultColor, data, type } = opts;
  return {
    [`current${type}Color`]: (value: Value) => {
      if (value.selection && value.selection.isFocused && value.activeMarks) {
        const activeColorMarks = value.activeMarks
          .filter(mark => !!(mark && mark.type === type))
          .reduce((colors: string[], mark: Mark) => {
            if (mark && mark.data.get(data)) {
              return [...colors, mark.data.get(data)];
            }
            return colors;
          }, []);
        const uniqueColorMarks = [...Array.from(new Set(activeColorMarks))];
        if (uniqueColorMarks.length !== 0) {
          return uniqueColorMarks[0];
        }
      }
      return defaultColor;
    }
  };
}
