import { Change } from "slate";
import { Editor } from "slate-react";

export default function moveForward(
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
  const { start, end } = selection;
  console.log(startBlock, endBlock);
  console.log("moving forward");
  if (startBlock === endBlock && startBlock.type === captionType) {
    if (end.offset === startBlock.text.length) {
      event.preventDefault();
      if (start !== end) {
        change.moveToEnd();
      }
      return true;
    }
  }
  return change;
}
