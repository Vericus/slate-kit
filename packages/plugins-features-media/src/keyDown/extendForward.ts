export default function extendForward(editor, types, captionType, event, next) {
  const { value } = editor;
  const { selection, startBlock, endBlock } = value;
  const { focus, isForward } = selection;
  if (startBlock === endBlock && startBlock.type === captionType) {
    event.preventDefault();
    if ((isForward && focus.offset !== startBlock.text.length) || !isForward) {
      editor.moveFocusForward(1);
    }
    return;
  }
  return next();
}
