// @flow
import { type Change } from "slate";

export default function createChanges() {
  return {
    toggleBold: (change: Change) => change.toggleMark("bold"),
    toggleItalic: (change: Change) => change.toggleMark("italic"),
    toggleUnderline: (change: Change) => change.toggleMark("underline"),
    toggleStrikethrough: (change: Change) => change.toggleMark("strikethrough")
  };
}
