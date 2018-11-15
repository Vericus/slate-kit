import { Editor } from "slate";
import handleUndo from "./handleUndo";
import handleRedo from "./handleRedo";
import { TypeOptions } from "../options";

export default function createCommands(opts: TypeOptions) {
  const { onUndo, onRedo } = opts;
  return {
    handleUndo: (editor: Editor) => handleUndo(editor, onUndo),
    handleRedo: (editor: Editor) => handleRedo(editor, onRedo)
  };
}
