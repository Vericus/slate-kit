import { Document, Selection, Change } from "slate";

export default function removeExpandedMark(
  document: Document,
  selection: Selection,
  change: Change,
  type: string
): void {
  return document
    .getMarksAtRange(selection)
    .filter(mark => mark.type === type)
    .forEach(mark => change.removeMarkAtRange(selection, mark));
}
