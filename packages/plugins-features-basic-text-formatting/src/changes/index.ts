import { Change } from "slate";
import { TypeOptions } from "../options";

export default function createChanges(options: TypeOptions) {
  const { marks } = options;
  const { bold, italic, underline, strikethrough } = marks;
  return {
    toggleBold: (change: Change) =>
      bold ? change.toggleMark(bold).focus() : change,
    toggleItalic: (change: Change) =>
      italic ? change.toggleMark(italic).focus() : change,
    toggleUnderline: (change: Change) =>
      underline ? change.toggleMark(underline).focus() : change,
    toggleStrikethrough: (change: Change) =>
      strikethrough ? change.toggleMark(strikethrough).focus() : change
  };
}
