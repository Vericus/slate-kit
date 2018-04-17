// @flow
import isHotkey from "is-hotkey";
import type { Change } from "slate";
import { environments } from "@vericus/slate-kit-plugins-utils";
import Options, { type typeOptions } from "./options";
import handleUndo from "./utils/handleUndo";
import handleRedo from "./utils/handleRedo";

export default function History(pluginOptions: typeOptions = {}) {
  const opts = new Options(pluginOptions);
  const { onUndo, onRedo } = opts;
  const UNDO = isHotkey("mod+z");
  const REDO_MAC = isHotkey("mod+shift+z");
  const REDO_OTHER = isHotkey("mod+y");
  const REDO = e => (environments.IS_MAC ? REDO_MAC(e) : REDO_OTHER(e));

  function onKeyDown(e: KeyboardEvent, change: Change) {
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
