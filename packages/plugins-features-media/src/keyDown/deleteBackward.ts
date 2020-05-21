import { Block } from "slate";

export default function deleteBackward(
  editor,
  types,
  captionType,
  mediaTypes,
  event,
  next
) {
  const { value } = editor;
  const { selection, startBlock, previousBlock } = value;
  const { isExpanded, start } = selection;
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  if (
    !isExpanded &&
    previousBlock &&
    (previousBlock.type === captionType || previousBlock.type == imageType) &&
    start.offset === 0 &&
    startBlock &&
    startBlock.type &&
    !types.includes(startBlock.type)
  ) {
    const mediaBlock = editor.getClosestMedia(previousBlock);
    if (mediaBlock && Block.isBlock(mediaBlock)) {
      event.preventDefault();
      editor.moveToRangeOfNode(mediaBlock);
      return undefined;
    }
  } else {
    event.preventDefault();
    if (isExpanded) {
      editor.deleteBackwardAtRange(selection, {});
    } else {
      editor.deleteBackward(1);
    }
    editor.normalize({ normalize: true });
    return undefined;
  }
  return next();
}
