import { Change } from "slate";
import hotkeys from "slate-hotkeys";
import Options, { TypeOptions } from "./options";
import * as utils from "./utils";

export default function History(pluginOptions: TypeOptions = {}) {
  const opts = new Options(pluginOptions);
  const { onUndo, onRedo } = opts;

  function onKeyDown(e: KeyboardEvent, change: Change) {
    const { value } = change;
    if (hotkeys.isUndo(e)) {
      return utils.handleUndo(value, change, onUndo);
    } else if (hotkeys.isRedo(e)) {
      return utils.handleRedo(value, change, onRedo);
    }
    return undefined;
  }

  return {
    onKeyDown,
    utils
  };
}
