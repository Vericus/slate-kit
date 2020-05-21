import { Editor } from "slate";

export default function handleUndo(editor: Editor): void {
  if (!editor.hasUndo()) return;
  editor.undo();
  if (editor.props.onUndo && typeof editor.props.onUndo === "function") {
    editor.props.onUndo(
      editor.operations.filter(
        (operation) => !!(operation && operation.type !== "set_value")
      )
    );
  }
}
