import { Value } from "slate";
import { hasActiveMark } from "@vericus/slate-kit-plugins-utils";

export default function createUtils() {
  return {
    isBold: (value: Value) => hasActiveMark(value, "bold"),
    isItalic: (value: Value) => hasActiveMark(value, "italic"),
    isUnderline: (value: Value) => hasActiveMark(value, "underline"),
    isStrikethrough: (value: Value) => hasActiveMark(value, "strikethrough")
  };
}
