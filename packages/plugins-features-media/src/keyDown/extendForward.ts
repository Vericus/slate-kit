import { Change } from "slate";

export default function extendForward(editor, types, captionType, event, next) {
  const { value } = editor;
  const {
    document,
    selection,
    startBlock,
    endBlock,
    previousBlock,
    nextBlock
  } = value;
  const { anchor, focus, isForward } = selection;
  if (startBlock === endBlock && startBlock.type === captionType) {
    event.preventDefault();
    if ((isForward && focus.offset !== startBlock.text.length) || !isForward) {
      editor.moveFocusForward(1);
    }
    return;
  }
  return next();
}
