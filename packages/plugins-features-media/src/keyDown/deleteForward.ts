import { Change, Node, Block } from "slate";
import { Editor } from "slate-react";

export default function deleteForward(
  type,
  types,
  captionType,
  event,
  change: Change,
  editor: Editor
) {
  const { value } = change;
  const { document, selection, startBlock, nextBlock } = value;
  const { isExpanded } = selection;
  if (
    nextBlock &&
    types.includes(nextBlock.type) &&
    nextBlock.type !== captionType &&
    !isExpanded
  ) {
    let mediaBlock: Node | null = nextBlock;
    while (
      mediaBlock &&
      Block.isBlock(mediaBlock) &&
      mediaBlock.type !== type
    ) {
      mediaBlock = document.getParent(mediaBlock.key);
    }
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
