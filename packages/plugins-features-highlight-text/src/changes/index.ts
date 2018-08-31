import { Mark, Data, Range } from "slate";
import { Change } from "slate";
import {
  hasMark,
  removeCollapsedMark,
  removeExpandedMark
} from "@vericus/slate-kit-plugins-utils";
import tinycolor from "tinycolor2";
import { TypeOptions } from "../options";

export default function createChanges(opt: TypeOptions) {
  const { defaultColor, data, type } = opt;
  return {
    changeColor: (change: Change, color: string) => {
      const { value } = change;
      const { selection, document } = value;
      const range = Range.create(selection);
      if (hasMark(value, type)) {
        if (tinycolor(color).toName() === defaultColor) {
          if (selection.isCollapsed) {
            removeCollapsedMark(value, change, type);
          } else {
            removeExpandedMark(document, range, change, type);
          }
        } else {
          const newMark = new Mark({
            type,
            data: Data.create({
              [data]: color
            })
          });
          if (range.isCollapsed) {
            removeCollapsedMark(value, change, type);
            change.focus();
            change.addMark(newMark);
          } else {
            removeExpandedMark(document, range, change, type);
            change.addMarkAtRange(range, newMark);
          }
        }
      } else if (tinycolor(color).toName() !== defaultColor) {
        const mark = new Mark({
          type,
          data: Data.create({
            [data]: color
          })
        });
        if (range.isCollapsed) {
          change.addMark(mark);
        } else {
          removeExpandedMark(document, range, change, type);
          change.addMarkAtRange(range, mark);
        }
      }
      change.focus();
      return change;
    }
  };
}
