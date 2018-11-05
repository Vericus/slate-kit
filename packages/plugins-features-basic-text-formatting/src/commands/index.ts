import { Editor } from "slate";
import { TypeOptions } from "../options";

export default function createCommands(options: TypeOptions) {
  const { marks } = options;
  const { bold, italic, underline, strikethrough } = marks;
  return {
    toggleBold: (editor: Editor) => bold && editor.toggleMark(bold).focus(),
    toggleItalic: (editor: Editor) =>
      italic && editor.toggleMark(italic).focus(),
    toggleUnderline: (editor: Editor) =>
      underline && editor.toggleMark(underline).focus(),
    toggleStrikethrough: (editor: Editor) =>
      strikethrough && editor.toggleMark(strikethrough).focus()
  };
}
