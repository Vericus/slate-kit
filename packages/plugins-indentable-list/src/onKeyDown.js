// @flow
import { isKeyHotkey } from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { type typeOptions } from "./options";
import { resetStartAt, unwrapList } from "./changes";
import { isListNode } from "./utils";

export default function createOnKeyDown(opts: typeOptions, pluginsWrapper) {
  const isTab = isKeyHotkey("tab");
  const isShiftTab = isKeyHotkey("shift+tab");
  const isEnter = isKeyHotkey("enter");
  const isShiftEnter = isKeyHotkey("shift+enter");
  const {
    isDeleteCharBackward,
    isDeleteLineBackward,
    isDeleteWordBackward
  } = hotkeys;
  const isDelete = e =>
    isDeleteCharBackward(e) ||
    isDeleteLineBackward(e) ||
    isDeleteWordBackward(e);

  return (e, change) => {
    const { value } = change;
    const { startBlock, endBlock, selection } = value;
    const { isCollapsed, startOffset } = selection;
    const isIndent = isTab(e) && !isShiftTab(e);
    const isSplitBlock =
      isEnter(e) && !isShiftEnter(e) && isListNode(opts, startBlock);
    const isDeleting = isDelete(e);
    const isOutdent =
      isShiftTab(e) ||
      (isDeleting &&
        startBlock === endBlock &&
        isCollapsed &&
        startOffset === 0);
    if (!(isIndent || isSplitBlock || isOutdent)) return undefined;
    if (isIndent) {
      e.preventDefault();
      e.stopPropagation();
      resetStartAt(opts, change);
      return undefined;
    } else if (isSplitBlock) {
      if (startBlock === endBlock && isCollapsed && startBlock.text === "") {
        e.preventDefault();
        e.stopPropagation();
        unwrapList(opts, change, isDeleting, pluginsWrapper);
        return true;
      } else if (startBlock === endBlock) {
        change.insertBlock({
          type: startBlock.type,
          data: startBlock.data.delete("startAt")
        });
        return true;
      }
      return undefined;
    }
    if (isListNode(opts, startBlock)) {
      e.preventDefault();
      e.stopPropagation();
      unwrapList(opts, change, isDeleting, pluginsWrapper);
      return true;
    }
    return undefined;
  };
}
