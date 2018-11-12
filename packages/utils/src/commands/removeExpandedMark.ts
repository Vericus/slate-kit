import { Value, Editor } from "slate";

export default function removeExpandedMark(editor: Editor, type: string): any {
  const { value }: { value: Value } = editor;
  const { document, selection } = value;
  return document
    .getMarksAtRange(selection)
    .filter(mark => !!(mark && mark.type === type))
    .forEach(mark => mark && editor.removeMarkAtRange(selection, mark));
}
