// @flow
import isHotkey from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { type typeOptions } from "./options";

export default function createOnKeyDown(opts: typeOptions, changes, utils) {
  const { tabable } = opts;
  const { increaseIndent, decreaseIndent } = changes;
  const { getIndentationLevel } = utils;
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
    if (!(isIndent || isOutdent)) return;
    if (isOutdent) {
      if (getIndentationLevel(startBlock) !== 0) {
        event.preventDefault();
        event.stopPropagation();
        decreaseIndent(change);
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
      } else {
        increaseIndent(change);
      }
    }
  };
}
