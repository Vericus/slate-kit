// @flow
import type { Value } from "slate";
import type { typeOptions } from "../options";

export default function createUtils(opts: typeOptions) {
  const { defaultColor, data, type } = opts;
  return {
    currentColor: (value: Value) => {
      if (value.activeMarks) {
        const activeColorMarks = value.activeMarks
          .filter(mark => mark.type === type)
          .map(mark => mark.data.get(data));
        const uniqueColorMarks = [...new Set(activeColorMarks)];
        if (uniqueColorMarks.length !== 0) {
          return uniqueColorMarks[0];
        }
      }
      return defaultColor;
    }
  };
}
