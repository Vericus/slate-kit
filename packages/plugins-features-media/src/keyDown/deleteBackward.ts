import { Change, Node, Block } from "slate";
import { Editor } from "slate-react";

export default function deleteBackward(
  type,
  types,
  captionType,
  event,
  change: Change,
  editor: Editor
) {
  const { value } = change;
  const { document, selection, startBlock, previousBlock } = value;
  const { isExpanded } = selection;
  if (
    !isExpanded &&
    previousBlock &&
    previousBlock.type === captionType &&
    !types.includes(startBlock.type)
  ) {
    let mediaBlock: Node | null = previousBlock;
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
      change.deleteBackwardAtRange(selection, {});
    } else {
      change.deleteBackward(1);
    }
    change.normalize({ normalize: true });
    return false;
  }
}
