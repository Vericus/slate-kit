import { Value } from "slate";
import { hasActiveMark } from "@vericus/slate-kit-plugins-utils";
import { TypeOptions } from "../options";

const returnFalse = (value: Value) => false;

export default function createUtils(options: TypeOptions) {
  const { marks } = options;
  const { bold, italic, underline, strikethrough } = marks;
  return {
    isBold: bold ? (value: Value) => hasActiveMark(value, bold) : returnFalse,
    isItalic: italic
      ? (value: Value) => hasActiveMark(value, italic)
      : returnFalse,
    isUnderline: underline
      ? (value: Value) => hasActiveMark(value, underline)
      : returnFalse,
    isStrikethrough: strikethrough
      ? (value: Value) => hasActiveMark(value, strikethrough)
      : returnFalse
  };
}
