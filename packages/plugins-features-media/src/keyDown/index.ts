import { Editor, Block, Text } from "slate";
import Hotkeys from "slate-hotkeys";
import { TypeOption } from "../options";
import extendForward from "./extendForward";
import extendBackward from "./extendBackward";
import deleteBackward from "./deleteBackward";
import deleteForward from "./deleteForward";

export default function createOnKeyDown(opts: TypeOption) {
  const { captionType, type, mediaTypes } = opts;
  const imageType = mediaTypes.image;
  const types = [captionType, type, ...[imageType ? imageType.type : []]];
  return (event, editor: Editor, next) => {
    const { value } = editor;
    const { startBlock, endBlock, previousBlock, nextBlock, document } = value;
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
        const defaultBlock = editor.getDefaultBlock();
        if (defaultBlock) {
          const parent = document.getParent(mediaBlock.key);
          if (
            parent &&
            !Text.isText(parent) &&
            parent.nodes &&
            parent.nodes.toArray().indexOf(mediaBlock) !== -1
          ) {
            const index = parent.nodes.toArray().indexOf(mediaBlock);
            event.preventDefault();
            editor
              .insertNodeByKey(
                parent.key,
                index + 1,
                Block.create({
                  type: defaultBlock
                })
              )
              .moveToEndOfNode(mediaBlock)
              .moveForward(1);
            return;
          }
        }
      }
    }
    return next();
  };
}
