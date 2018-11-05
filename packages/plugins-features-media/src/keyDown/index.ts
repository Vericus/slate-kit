import { Change, Editor } from "slate";
import Hotkeys from "slate-hotkeys";
import isHotkey from "is-hotkey";
import { TypeOption } from "../options";
import extendForward from "./extendForward";
import extendBackward from "./extendBackward";
import deleteBackward from "./deleteBackward";
import deleteForward from "./deleteForward";

export default function createOnKeyDown(opts: TypeOption, pluginsWrapper) {
  const { captionType, type, mediaTypes } = opts;
  const imageType = mediaTypes.image;
  const types = [captionType, type, ...[imageType ? imageType.type : []]];
  return (event, editor: Editor, next) => {
    const { value } = editor;
    const { startBlock, endBlock, previousBlock, nextBlock } = value;
    if (
      !(
        types.includes(startBlock.type) ||
        types.includes(endBlock.type) ||
        (previousBlock && types.includes(previousBlock.type)) ||
        (nextBlock && types.includes(nextBlock.type))
      )
    ) {
      return next();
    }
    if (Hotkeys.isExtendForward(event)) {
      return extendForward(editor, types, captionType, event, next);
    } else if (Hotkeys.isExtendBackward(event)) {
      return extendBackward(editor, types, captionType, event, next);
    } else if (Hotkeys.isDeleteBackward(event)) {
      return deleteBackward(editor, types, captionType, event, next);
    } else if (Hotkeys.isDeleteForward(event)) {
      return deleteForward(editor, types, captionType, event, next);
    } else if (Hotkeys.isSplitBlock(event)) {
      const mediaBlock = editor.getSelectedMediaBlock(value);
      if (mediaBlock) {
        const defaultBlock = pluginsWrapper.getDefaultBlock();
        event.preventDefault();
        editor.moveToEndOfNode(mediaBlock);
        if (defaultBlock) {
          editor.insertBlock(defaultBlock);
        }
        return;
      }
    }
    return next();
  };
}
