import isHotkey from "is-hotkey";
import { Change } from "slate";
import Options from "./options";

function createOnKeyDown(opts: Options) {
  const { hotkeys } = opts;
  const { change: changeFn } = opts;
  const hotkeyArrays = Array.isArray(hotkeys) ? hotkeys : [hotkeys];

  function checkHotKey(event): boolean {
    return hotkeyArrays.some(hotkey => isHotkey(hotkey, event));
  }
  return (event, change: Change): void | Change => {
    if (checkHotKey(event)) {
      change.call(changeFn);
      return true;
    }
    return undefined;
  };
}

export default createOnKeyDown;
