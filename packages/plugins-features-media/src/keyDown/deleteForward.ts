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
  const { start, end, isExpanded } = selection;
  console.log("delete forward");
  if (isExpanded) {
    change.deleteForwardAtRange(selection, {});
  } else {
    change.deleteForward(1);
  }
  change.normalize({ normalize: true });
  return false;
}
