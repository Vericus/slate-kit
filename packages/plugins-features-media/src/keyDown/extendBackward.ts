import { Change } from "slate";
import { Editor } from "slate-react";

export default function extendBackward(
  types,
  captionType,
  event,
  change: Change,
  editor: Editor
) {
  const { value } = change;
  const {
    document,
    selection,
    startBlock,
    endBlock,
    previousBlock,
    nextBlock
  } = value;
  const { anchor, focus, isBackward, isCollapsed } = selection;
  console.log("extend backward");
  if (startBlock === endBlock && startBlock.type === captionType) {
    event.preventDefault();
    if (
      (focus.offset !== 0 && isBackward) ||
      (!isBackward && !(isCollapsed && focus.offset === 0))
    ) {
      change.moveFocusBackward(1);
    }
    return true;
  }
}
