// @flow
import { type Value } from "slate";
import { hasMark } from "@vericus/slate-kit-plugins-utils";

export default function createUtils() {
  return {
    isBold: (value: Value) => hasMark(value, "bold"),
    isItalic: (value: Value) => hasMark(value, "italic"),
    isUnderline: (value: Value) => hasMark(value, "underline"),
    isStrikethrough: (value: Value) => hasMark(value, "strikethrough")
  };
}
