import { Mark, Data, Selection } from "slate";
import { Editor } from "slate";
import tinycolor from "tinycolor2";
import { TypeOptions } from "../options";

export default function createCommands(opt: TypeOptions) {
  const { defaultColor, data, type, name } = opt;
  return {
    [`change${name}Color`]: (editor: Editor, color: string) => {
      const { value } = editor;
      const { selection, document } = value;
      if (editor.hasMark(value, type)) {
        if (tinycolor(color).toName() === defaultColor) {
          if (selection.isCollapsed) {
            editor.removeCollapsedMark(type);
          } else {
            editor.removeExpandedMark(type);
          }
        } else {
          const newMark = new Mark({
            type,
            data: Data.create({
              [data]: color
            })
          });
          if (selection.isCollapsed) {
            editor
              .removeCollapsedMark(type)
              .focus()
              .addMark(newMark);
          } else {
            editor.removeExpandedMark(type).addMarkAtRange(selection, newMark);
          }
        }
      } else if (tinycolor(color).toName() !== defaultColor) {
        const mark = new Mark({
          type,
          data: Data.create({
            [data]: color
          })
        });
        if (selection.isCollapsed) {
          editor.addMark(mark);
        } else {
          editor.removeExpandedMark(type).addMarkAtRange(selection, mark);
        }
      }
      editor.focus();
      return;
    }
  };
}
