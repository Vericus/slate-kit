import { List } from "immutable";
import { Value, Editor, Operation } from "slate";

export default function handleRedo(
  editor: Editor,
  onRedo?: (operations: List<Operation>) => void
) {
  const { value } = editor;
  if (!editor.hasRedo(value)) return;
  const redos = value.data.get("redos");
  redos.some(redo => {
    editor.redo();
    if (redo.size === 1 && redo.get(0).type === "set_selection") {
      return false;
    }
    return true;
  });
  if (onRedo && typeof onRedo === "function") {
    onRedo(
      editor.operations.filter(operation => operation.type !== "set_value")
    );
  }
}
