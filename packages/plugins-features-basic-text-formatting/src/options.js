// @flow
import { Record } from "immutable";
import { type Change } from "slate";

export type KeyBinding = {
  hotkeys: string,
  changeName?: string,
  change?: (change: Change) => void
};

export type typeOptions = {
  renderMark?: () => void,
  keyBindings?: Array<KeyBinding>
};

const defaultOption: typeOptions = {
  keyBindings: [
    { hotkeys: "mod+b", changeName: "toggleBold" },
    { hotkeys: "mod+i", changeName: "toggleItalic" },
    { hotkeys: "mod+u", changeName: "toggleUnderline" }
  ]
};

class Options extends Record(defaultOption) {
  renderMark: () => void;
  keyBindings: Array<KeyBinding>;
}

export default Options;
