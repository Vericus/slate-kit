import { List } from "immutable";
import { Value, Editor, Operation } from "slate";

export default function handleRedo(
  editor: Editor,
  onRedo?: (operations: List<Operation>) => void
) {
  if (!editor.hasRedo()) return;
  editor.redo();

  if (onRedo && typeof onRedo === "function") {
    onRedo(
      editor.operations.filter(operation => operation.type !== "set_value")
    );
  }
}
