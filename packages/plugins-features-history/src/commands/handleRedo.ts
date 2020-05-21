import { Editor } from "slate";

export default function handleRedo(editor: Editor): void {
  if (!editor.hasRedo()) return;
  editor.redo();

  if (editor.props.onRedo && typeof editor.props.onRedo === "function") {
    editor.props.onRedo(
      editor.operations.filter(
        (operation) => !!(operation && operation.type !== "set_value")
      )
    );
  }
}
