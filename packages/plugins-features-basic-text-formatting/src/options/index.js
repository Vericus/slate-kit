// @flow
import { Record } from "immutable";
import { type Change } from "slate";

export type KeyBinding = {
  hotkeys: string,
  changeName?: string,
  change?: (change: Change) => void
};

export type typeOptions = {
  renderMark: ?() => void,
  keyBindings: Array<KeyBinding>,
  marks: Array<string>
};

const defaultOption: typeOptions = {
  keyBindings: [
    { hotkeys: "mod+b", changeName: "toggleBold" },
    { hotkeys: "mod+i", changeName: "toggleItalic" },
    { hotkeys: "mod+u", changeName: "toggleUnderline" }
  ],
  marks: ["bold", "italic", "underline", "strikethrough"],
  renderMark: undefined
};

class Options extends Record(defaultOption) {
  renderMark: () => void;
  keyBindings: Array<KeyBinding>;
  marks: Array<string>;
}

export default Options;
