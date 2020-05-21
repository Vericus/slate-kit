import BindHotKey from "@vericus/slate-kit-bind-hotkey";

export default function (opt) {
  const { keyBindings } = opt;
  return keyBindings
    ? keyBindings.map(({ hotkeys, commandName }) =>
        BindHotKey({
          hotkeys,
          commandName,
        })
      )
    : [];
}
