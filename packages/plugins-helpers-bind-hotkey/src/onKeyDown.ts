import isHotkey from "is-hotkey";
import { Change } from "slate";
import Options from "./options";

function createOnKeyDown(opts: Options) {
  const { hotkeys } = opts;
  const { change: changeFn, changeArgs } = opts;
  const hotkeyArrays = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
  console.log(changeArgs);

  function checkHotKey(event): boolean {
    return hotkeyArrays.some(hotkey => isHotkey(hotkey)(event));
  }
  return (event, change: Change): void | Change | boolean => {
    if (checkHotKey(event)) {
      if (changeArgs) {
        change.call(changeFn, ...changeArgs);
      } else {
        change.call(changeFn);
      }
      return true;
    }
    return undefined;
  };
}

export default createOnKeyDown;
