import { Change } from "slate";
import { Editor } from "slate-react";
import Hotkeys from "slate-hotkeys";
import isHotkey from "is-hotkey";
import { TypeOption } from "../options";
import extendForward from "./extendForward";
import extendBackward from "./extendBackward";
import deleteBackward from "./deleteBackward";
import deleteForward from "./deleteForward";

export default function createOnKeyDown(opts: TypeOption) {
  const { captionType, type, mediaTypes } = opts;
  const imageType = mediaTypes.image;
  const types = [captionType, type, ...[imageType ? imageType.type : []]];
  return (event, change: Change, editor: Editor) => {
    const { value } = change;
    const {
      document,
      selection,
      startBlock,
      endBlock,
      previousBlock,
      nextBlock
    } = value;
    const { start, end } = selection;
    console.log(types, startBlock, endBlock, previousBlock, nextBlock);
    if (
      !(
        types.includes(startBlock.type) ||
        types.includes(endBlock.type) ||
        (previousBlock && types.includes(previousBlock.type)) ||
        (nextBlock && types.includes(nextBlock.type))
      )
    )
      return;
    if (Hotkeys.isExtendForward(event)) {
      return extendForward(types, captionType, event, change, editor);
    } else if (Hotkeys.isExtendBackward(event)) {
      return extendBackward(types, captionType, event, change, editor);
    } else if (Hotkeys.isDeleteBackward(event)) {
      return deleteBackward(types, captionType, event, change, editor);
    } else if (Hotkeys.isDeleteForward(event)) {
      return deleteForward(types, captionType, event, change, editor);
    }
  };
}