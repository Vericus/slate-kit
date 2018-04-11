// @flow

import isHotkey from "is-hotkey";
import type { Change } from "slate";
import type Options from "./options";

function createOnKeyDown(opts: Options) {
  const { hotkeys } = opts;
  const { change: changeFn } = opts;
  const hotkeyArrays = Array.isArray(hotkeys) ? hotkeys : [hotkeys];

  function checkHotKey(event: SyntheticKeyboardEvent<*>): boolean {
    return hotkeyArrays.some(hotkey => isHotkey(hotkey, event));
  }
  return (event: SyntheticKeyboardEvent<*>, change: Change): void | Change => {
    if (checkHotKey(event)) {
      return change.call(changeFn);
    }
    return undefined;
  };
}

export default createOnKeyDown;
