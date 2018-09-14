import { Change } from "slate";
import { Editor } from "slate-react";

export default function deleteForward(
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
  console.log("delete forward");
  change.deleteForwardAtRange(selection, {}).normalize({ normalize: true });
  return false;
}
