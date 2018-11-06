import { List } from "immutable";
import { Value, Editor, Operation } from "slate";

export default function handleUndo(
  editor: Editor,
  onUndo?: (operations: List<Operation>) => void
) {
  const { value } = editor;
  if (!editor.hasUndo(value)) return;
  const undos = value.data.get("undos");
  undos.some(undo => {
    console.log(editor.operations);
    if (
      undo.size === 1 &&
      (undo.get(0).type === "set_selection" || undo.get(0).type === "set_value")
    ) {
      return false;
    }
    editor.undo();
    return true;
  });
  if (onUndo && typeof onUndo === "function") {
    onUndo(
      editor.operations.filter(operation => operation.type !== "set_value")
    );
  }
}
