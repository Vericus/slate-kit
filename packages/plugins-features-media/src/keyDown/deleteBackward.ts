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
  const { start, end, isExpanded } = selection;
  console.log("delete backward");
  if (isExpanded) {
    change.deleteBackwardAtRange(selection, {});
  } else {
    change.deleteBackward(1);
  }
  change.normalize({ normalize: true });
  return false;
}
