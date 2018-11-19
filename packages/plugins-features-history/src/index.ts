import { Editor } from "slate";
import hotkeys from "slate-hotkeys";
import CreateCommands from "./commands";
import CreateQueries from "./queries";

export default function History() {
  const queries = CreateQueries();
  const commands = CreateCommands();

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
