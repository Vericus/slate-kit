import { Change } from "slate";

export default function createChanges() {
  return {
    toggleBold: (change: Change) => change.toggleMark("bold").focus(),
    toggleItalic: (change: Change) => change.toggleMark("italic").focus(),
    toggleUnderline: (change: Change) => change.toggleMark("underline").focus(),
    toggleStrikethrough: (change: Change) =>
      change.toggleMark("strikethrough").focus()
  };
}
