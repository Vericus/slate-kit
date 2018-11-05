import { Editor } from "slate";
import isHotkey from "is-hotkey";
import hotkeys from "slate-hotkeys";
import { TypeOptions } from "../options";

export default function createOnKeyDown(opts: TypeOptions) {
  const { tabable } = opts;
  const {
    isDeleteBackward,
    isDeleteLineBackward,
    isDeleteWordBackward
  } = hotkeys;
  const isDelete = e =>
    isDeleteBackward(e) || isDeleteLineBackward(e) || isDeleteWordBackward(e);

  return (event, editor: Editor, next) => {
    const { value } = editor;
    const { startBlock, endBlock, selection } = value;
    const {
      isCollapsed,
      start: { offset: startOffset }
    } = selection;
    const isIndent = isHotkey("tab", event);
    const isOutdent =
      isHotkey("shift+tab", event) ||
      (isDelete(event) &&
        startBlock === endBlock &&
        isCollapsed &&
        startOffset === 0);
    if (isOutdent) {
      event.preventDefault();
      event.stopPropagation();
      if (editor.getIndentationLevel(startBlock) !== 0) {
        editor.decreaseIndent();
        return;
      }
    } else if (isIndent) {
      event.preventDefault();
      event.stopPropagation();
      if (
        startBlock === endBlock &&
        selection.isCollapsed &&
        tabable.includes(startBlock.type)
      ) {
        editor.insertText("\t");
        return;
      }
      editor.increaseIndent();
      return;
    }
    return next();
  };
}
