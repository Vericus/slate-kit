import { Change, Node, Block } from "slate";
import { Editor } from "slate-react";

export default function deleteBackward(
  utils,
  types,
  captionType,
  event,
  change: Change,
  editor: Editor
) {
  const { value } = change;
  const { document, selection, startBlock, previousBlock } = value;
  const { isExpanded, start } = selection;
  if (
    !isExpanded &&
    previousBlock &&
    previousBlock.type === captionType &&
    start.offset === 0 &&
    !types.includes(startBlock.type)
  ) {
    const mediaBlock = utils.getClosestMedia(document, previousBlock);
    if (mediaBlock && Block.isBlock(mediaBlock)) {
      event.preventDefault();
      change.moveToRangeOfNode(mediaBlock);
      return true;
    }
  } else {
    event.preventDefault();
    if (isExpanded) {
      change.deleteBackwardAtRange(selection, {});
    } else {
      change.deleteBackward(1);
    }
    change.normalize({ normalize: true });
    return false;
  }
}
