import { Editor } from "slate";
import hotkeys from "slate-hotkeys";
import Options, { TypeOptions } from "./options";
import CreateCommands from "./commands";
import CreateQueries from "./queries";

export default function History(pluginOptions: TypeOptions = {}) {
  const opts = new Options(pluginOptions);

  const queries = CreateQueries();
  const commands = CreateCommands(opts);

  function onKeyDown(e: KeyboardEvent, editor: Editor, next) {
    if (hotkeys.isUndo(e)) {
      return editor.handleUndo();
    } else if (hotkeys.isRedo(e)) {
      return editor.handleRedo();
    }
    return next();
  }

  return {
    commands,
    queries,
    onKeyDown
  };
}
