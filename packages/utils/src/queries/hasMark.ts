import { Editor } from "slate";

export default function hasMark(editor: Editor, type: string): boolean {
  return (
    editor.value.marks &&
    editor.value.marks.some(mark => (mark && mark.type === type) || false)
  );
}
