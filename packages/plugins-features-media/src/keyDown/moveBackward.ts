import { Change } from "slate";
import { Editor } from "slate-react";

export default function moveBackward(
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
  if (startBlock === endBlock && startBlock.type === captionType) {
    console.log(end.offset);
    if (start.offset === 0) {
      event.preventDefault();
      if (start === end) {
        return true;
      } else {
        change.moveToStart();
        return true;
      }
    }
    console.log(startBlock.text.length);
  }
  console.log("moving backward");
  return change;
}
