import { List } from "immutable";
import { Editor, Operation } from "slate";

export default function handleUndo(
  editor: Editor,
  onUndo?: (operations: List<Operation>) => void
) {
  if (!editor.hasUndo()) return;
  editor.undo();
  if (onUndo && typeof onUndo === "function") {
    onUndo(
      editor.operations.filter(operation => operation.type !== "set_value")
    );
  }
}
