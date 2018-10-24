import { Change, Node, Block } from "slate";
import { Editor } from "slate-react";

export default function deleteForward(
  utils,
  types,
  captionType,
  event,
  change: Change,
  editor: Editor
) {
  const { value } = change;
  const { document, selection, startBlock, nextBlock } = value;
  const { isExpanded, start } = selection;
  if (
    nextBlock &&
    types.includes(nextBlock.type) &&
    nextBlock.type !== captionType &&
    startBlock &&
    startBlock.text &&
    start.offset === startBlock.text.length &&
    !isExpanded
  ) {
    const mediaBlock = utils.getClosestMedia(document, nextBlock);
    if (mediaBlock && Block.isBlock(mediaBlock)) {
      event.preventDefault();
      change.moveToRangeOfNode(mediaBlock);
      return true;
    }
  } else {
    event.preventDefault();
    if (isExpanded) {
      change.deleteForwardAtRange(selection, {});
    } else {
      change.deleteForward(1);
    }
    change.normalize({ normalize: true });
    return true;
  }
}
