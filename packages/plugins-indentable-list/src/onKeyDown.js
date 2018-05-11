// @flow
import { isKeyHotkey } from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { Block } from "slate";
import { type typeOptions } from "./options";

export default function createOnKeyDown(opts: typeOptions, changes, utils) {
  const { resetStartAt, resetChecked, unwrapList, resetBlockStartAt } = changes;
  const { isListNode } = utils;
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
      isEnter(e) && !isShiftEnter(e) && isListNode(startBlock);
    const isOutdent =
      isShiftTab(e) ||
      (isDelete(e) &&
        startBlock === endBlock &&
        isCollapsed &&
        startOffset === 0);
    if (!(isIndent || isSplitBlock || isOutdent)) return;
    if (isIndent) {
      e.preventDefault();
      e.stopPropagation();
      resetStartAt(change);
    } else if (isSplitBlock) {
      const { value } = change;
      const { startBlock, endBlock, selection } = value;
      const { isCollapsed } = selection;
      if (startBlock === endBlock && isCollapsed && startBlock.text === "") {
        e.preventDefault();
        e.stopPropagation();
        unwrapList(change);
        return true;
      } else if (startBlock === endBlock) {
        change.insertBlock(startBlock.type);
        return true;
      }
    } else {
      if (isListNode(startBlock)) {
        e.preventDefault();
        e.stopPropagation();
        unwrapList(change);
        return true;
      }
    }
  };
}
