import { Change } from "slate";
import isHotkey from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { TypeOptions } from "../options";
import { increaseIndent, decreaseIndent } from "../changes";
import { getIndentationLevel } from "../utils";

export default function createOnKeyDown(opts: TypeOptions) {
  const { tabable } = opts;
  const {
    isDeleteBackward,
    isDeleteLineBackward,
    isDeleteWordBackward
  } = hotkeys;
  const isDelete = e =>
    isDeleteBackward(e) || isDeleteLineBackward(e) || isDeleteWordBackward(e);

  return (event, change: Change) => {
    const { value } = change;
    const { startBlock, endBlock, selection } = value;
    const {
      isCollapsed,
      start: { offset: startOffset }
    } = selection;
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
