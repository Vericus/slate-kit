import { Change, Node, Block } from "slate";

export default function deleteForward(editor, types, captionType, event, next) {
  const { value } = editor;
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
    const mediaBlock = editor.getClosestMedia(document, nextBlock);
    if (mediaBlock && Block.isBlock(mediaBlock)) {
      event.preventDefault();
      editor.moveToRangeOfNode(mediaBlock);
      return;
    }
  } else {
    event.preventDefault();
    if (isExpanded) {
      editor.deleteForwardAtRange(selection, {});
    } else {
      editor.deleteForward(1);
    }
    editor.normalize({ normalize: true });
    return;
  }
  return next();
}
