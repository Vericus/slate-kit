// @flow
import BindHotKey from "@vericus/slate-kit-bind-hotkey";
import { type KeyBinding } from "../options";
import type Options from "../options";

export default function(opt: Options, changes: any) {
  const { keyBindings } = opt;
  return keyBindings
    ? keyBindings.map(({ hotkeys, changeName, change }: KeyBinding) =>
        BindHotKey({ hotkeys, change: change || changes[changeName] })
      )
    : [];
}
