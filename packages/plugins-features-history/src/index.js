import isHotkey from "is-hotkey";
import { environments } from "@vericus/slate-kit-plugins-utils";
import handleUndo from "./utils/handleUndo";
import handleRedo from "./utils/handleRedo";

export default function History(opts = {}) {
  const { onUndo, onRedo } = opts;
  const UNDO = isHotkey("mod+z");
  const REDO_MAC = isHotkey("mod+shift+z");
  const REDO_OTHER = isHotkey("mod+y");
  const REDO = e => (environments.isMac ? REDO_MAC(e) : REDO_OTHER(e));

  function onKeyDown(e, change) {
    const { value } = change;
    if (UNDO(e)) {
      return handleUndo(value, change, onUndo);
    } else if (REDO(e)) {
      return handleRedo(value, change, onRedo);
    }
    return undefined;
  }

  return {
    onKeyDown
  };
}
