import { Document, Selection, Change } from "slate";

export default function removeExpandedMark(
  document: Document,
  selection: Selection,
  change: Change,
  type: string
): any {
  return document
    .getMarksAtRange(selection)
    .filter(mark => !!(mark && mark.type === type))
    .forEach(mark => mark && change.removeMarkAtRange(selection, mark));
}
