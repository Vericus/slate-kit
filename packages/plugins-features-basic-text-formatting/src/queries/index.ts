import { Value, Editor } from "slate";
import { TypeOptions } from "../options";

const returnFalse = (editor: Editor, value: Value) => false;

export default function createQueries(options: TypeOptions) {
  const { marks } = options;
  const { bold, italic, underline, strikethrough } = marks;
  return {
    isBold: bold
      ? (editor: Editor, value: Value) => editor.hasActiveMark(value, bold)
      : returnFalse,
    isItalic: italic
      ? (editor: Editor, value: Value) => editor.hasActiveMark(value, italic)
      : returnFalse,
    isUnderline: underline
      ? (editor: Editor, value: Value) => editor.hasActiveMark(value, underline)
      : returnFalse,
    isStrikethrough: strikethrough
      ? (editor: Editor, value: Value) =>
          editor.hasActiveMark(value, strikethrough)
      : returnFalse
  };
}
