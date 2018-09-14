import { Change } from "slate";
import { Editor } from "slate-react";

export default function extendForward(
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
  const { anchor, focus, isForward } = selection;
  console.log("extend forward");
  if (startBlock === endBlock && startBlock.type === captionType) {
    event.preventDefault();
    if ((isForward && focus.offset !== startBlock.text.length) || !isForward) {
      change.moveFocusForward(1);
    }
    return true;
  }
}
