import { Document, Range, Change } from "slate";

export default function removeExpandedMark(
  document: Document,
  selection: Range,
  change: Change,
  type: string
): any {
  return document
    .getMarksAtRange(selection)
    .filter(mark => !!(mark && mark.type === type))
    .forEach(mark => mark && change.removeMarkAtRange(selection, mark));
}
