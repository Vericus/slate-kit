import { Editor } from "slate";

export default function hasActiveMark(editor: Editor, type: string): boolean {
  const { value } = editor;
  return (
    value.selection &&
    value.selection.isFocused &&
    value.activeMarks &&
    value.activeMarks.some((mark) => !!(mark && mark.type === type))
  );
}
