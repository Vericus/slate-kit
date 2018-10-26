import BindHotKey from "@vericus/slate-kit-bind-hotkey";

export default function(opt, changes) {
  const { keyBindings } = opt;
  return keyBindings
    ? keyBindings.map(({ hotkeys, changeName, change }) =>
        BindHotKey({
          hotkeys,
          change: change || (changeName && changes[changeName])
        })
      )
    : [];
}
