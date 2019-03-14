import { Editor } from "slate";
import { TypeOptions } from "../options";

const returnFalse = (_editor: Editor) => false;

export default function createQueries(options: TypeOptions) {
  const { marks } = options;
  const { bold, italic, underline, strikethrough } = marks;
  return {
    isBold: bold ? (editor: Editor) => editor.hasActiveMark(bold) : returnFalse,
    isItalic: italic
      ? (editor: Editor) => editor.hasActiveMark(italic)
      : returnFalse,
    isUnderline: underline
      ? (editor: Editor) => editor.hasActiveMark(underline)
      : returnFalse,
    isStrikethrough: strikethrough
      ? (editor: Editor) => editor.hasActiveMark(strikethrough)
      : returnFalse
  };
}
