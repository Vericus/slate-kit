import handleUndo from "./handleUndo";
import handleRedo from "./handleRedo";
import { TypeOptions } from "../options";

export default function createCommands(opts: TypeOptions) {
  const { onUndo, onRedo } = opts;
  return {
    handleUndo: editor => handleUndo(editor, onUndo),
    handleRedo: editor => handleRedo(editor, onRedo)
  };
}
