// @flow
import isHotkey from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { type typeOptions } from "./options";
import { increaseIndent, decreaseIndent } from "./changes";
import { getIndentationLevel } from "./utils";

export default function createOnKeyDown(opts: typeOptions) {
  const { tabable } = opts;
  const {
    isDeleteCharBackward,
    isDeleteLineBackward,
    isDeleteWordBackward
  } = hotkeys;
  const isDelete = e =>
    isDeleteCharBackward(e) ||
    isDeleteLineBackward(e) ||
    isDeleteWordBackward(e);

  return (event, change) => {
    const { value } = change;
    const { startBlock, endBlock, selection } = value;
    const { isCollapsed, startOffset } = selection;
    const isIndent = isHotkey("tab", event);
    const isOutdent =
      isHotkey("shift+tab", event) ||
      (isDelete(event) &&
        startBlock === endBlock &&
        isCollapsed &&
        startOffset === 0);
    if (!(isIndent || isOutdent)) return undefined;
    if (isOutdent) {
      event.preventDefault();
      event.stopPropagation();
      if (getIndentationLevel(opts, startBlock) !== 0) {
        decreaseIndent(opts, change);
        return true;
      }
    } else if (isIndent) {
      event.preventDefault();
      event.stopPropagation();
      if (
        startBlock === endBlock &&
        selection.isCollapsed &&
        tabable.includes(startBlock.type)
      ) {
        change.insertText("\t");
        return undefined;
      }
      increaseIndent(opts, change);
    }
    return undefined;
  };
}
