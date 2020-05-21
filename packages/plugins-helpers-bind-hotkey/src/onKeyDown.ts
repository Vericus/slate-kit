import isHotkey from "is-hotkey";
import Options from "./options";

function createOnKeyDown(opts: Options) {
  const { hotkeys } = opts;
  const { commandName, commandArgs } = opts;
  const hotkeyArrays = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
  function checkHotKey(event): boolean {
    return hotkeyArrays.some((hotkey) => isHotkey(hotkey)(event));
  }
  return (event, editor, next): boolean => {
    if (checkHotKey(event) && editor[commandName]) {
      event.preventDefault();
      event.stopPropagation();
      if (commandArgs) {
        editor[commandName](...commandArgs);
      } else {
        editor[commandName]();
      }
      return true;
    }
    return next();
  };
}

export default createOnKeyDown;
