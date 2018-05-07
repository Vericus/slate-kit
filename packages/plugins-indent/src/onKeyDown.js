// @flow
import { isKeyHotkey } from "is-hotkey";
import { type typeOptions } from "./options";

export default function createOnKeyDown(opts: typeOptions, changes) {
  const { tabable } = opts;
  const { increaseIndent, decreaseIndent } = changes;
  const TAB = isKeyHotkey("tab");
  const SHIFT_TAB = isKeyHotkey("shift+tab");
  return (e, change) => {
    const { value } = change;
    const { startBlock, endBlock, selection } = value;
    if (!(TAB(e) || SHIFT_TAB(e))) return;
    if (SHIFT_TAB(e)) {
      e.preventDefault();
      e.stopPropagation();
      decreaseIndent(change);
    } else if (TAB(e)) {
      e.preventDefault();
      e.stopPropagation();
      if (
        startBlock === endBlock &&
        selection.isCollapsed &&
        tabable.includes(startBlock.type)
      ) {
        change.insertText("\t");
      } else {
        increaseIndent(change);
      }
    }
  };
}
