import { Editor } from "slate";

export default function removeCollapsedMark(editor: Editor, type: string): any {
  return (
    editor.value.marks &&
    editor.value.marks
      .filter(mark => !(mark && mark.type === type))
      .forEach(mark => mark && editor.removeMark(mark))
  );
}
