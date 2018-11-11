export default function extendBackward(
  editor,
  types,
  captionType,
  event,
  next
) {
  const { value } = editor;
  const { selection, startBlock, endBlock } = value;
  const { focus, isBackward, isCollapsed } = selection;
  if (startBlock === endBlock && startBlock.type === captionType) {
    event.preventDefault();
    if (
      (focus.offset !== 0 && isBackward) ||
      (!isBackward && !(isCollapsed && focus.offset === 0))
    ) {
      editor.moveFocusBackward(1);
    }
    return;
  }
  return next();
}
