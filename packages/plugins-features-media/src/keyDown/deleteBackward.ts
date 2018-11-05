import { Node, Block } from "slate";

export default function deleteBackward(
  editor,
  types,
  captionType,
  event,
  next
) {
  const { value } = editor;
  const { document, selection, startBlock, previousBlock } = value;
  const { isExpanded, start } = selection;
  if (
    !isExpanded &&
    previousBlock &&
    previousBlock.type === captionType &&
    start.offset === 0 &&
    startBlock &&
    startBlock.type &&
    !types.includes(startBlock.type)
  ) {
    const mediaBlock = editor.getClosestMedia(document, previousBlock);
    if (mediaBlock && Block.isBlock(mediaBlock)) {
      event.preventDefault();
      editor.moveToRangeOfNode(mediaBlock);
      return;
    }
  } else {
    event.preventDefault();
    if (isExpanded) {
      editor.deleteBackwardAtRange(selection, {});
    } else {
      editor.deleteBackward(1);
    }
    editor.normalize({ normalize: true });
    return;
  }
  return next();
}
