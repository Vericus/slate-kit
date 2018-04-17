// @flow
import type { Value, Change } from "slate";
import hasUndo from "./hasUndo";

export default function handleUndo(
  value: Value,
  editorChange: ?Change,
  onUndo: (change: Change) => void
) {
  const change = editorChange || value.change();
  const newChange = change.value.change();
  if (!hasUndo(value)) return change;
  value.history.undos.some(undo => {
    if (onUndo && typeof onUndo === "function") {
      newChange.undo();
    } else {
      change.undo();
    }
    if (undo.size === 1 && undo.get(0).type === "set_selection") {
      return false;
    }
    return true;
  });
  if (onUndo && typeof onUndo === "function") {
    onUndo(newChange);
  }
  return onUndo ? change : newChange;
}
