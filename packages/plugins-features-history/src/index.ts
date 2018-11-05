import { Editor } from "slate";
import hotkeys from "slate-hotkeys";
import Options, { TypeOptions } from "./options";
// import CreateCommands from "./commands";
// import CreateQueries from "./queries";

export default function History(pluginOptions: TypeOptions = {}) {
  const opts = new Options(pluginOptions);
  const { onUndo, onRedo } = opts;

  // const queries = CreateQueries(opts);
  // const commands = CreateCommands(opts);

  function onKeyDown(e: KeyboardEvent, editor: Editor, next) {
    if (hotkeys.isUndo(e)) {
      return editor.handleUndo(onUndo);
    } else if (hotkeys.isRedo(e)) {
      return editor.handleRedo(onRedo);
    }
    return next();
  }

  return {
    // commands,
    // queries,
    // onKeyDown
  };
}
