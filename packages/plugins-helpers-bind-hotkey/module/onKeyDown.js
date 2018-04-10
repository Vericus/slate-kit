import isHotkey from "is-hotkey";
import "slate";

function createOnKeyDown(opts) {
  var hotkeys = opts.hotkeys;
  var changeFn = opts.change;

  var hotkeyArrays = Array.isArray(hotkeys) ? hotkeys : [hotkeys];

  function checkHotKey(event) {
    return hotkeyArrays.some(function(hotkey) {
      return isHotkey(hotkey, event);
    });
  }
  return function(event, change) {
    if (checkHotKey(event)) {
      return change.call(changeFn);
    }
    return undefined;
  };
}

export default createOnKeyDown;
