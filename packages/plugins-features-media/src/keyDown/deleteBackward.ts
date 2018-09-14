import { Change } from "slate";
import { Editor } from "slate-react";

export default function deleteBackward(
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
  console.log("delete backward");
  change.deleteBackwardAtRange(selection, {}).normalize({ normalize: true });
  return false;
}
