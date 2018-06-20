// @flow
import { Record } from "immutable";
import { type Change } from "slate";

export type KeyBinding = {
  hotkeys: string,
  changeName?: string,
  change?: (change: Change) => void
};

export type typeOptions = {
  externalRenderer: boolean,
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
  externalRenderer: false
};

class Options extends Record(defaultOption) {
  externalRenderer: boolean;
  keyBindings: Array<KeyBinding>;
  marks: Array<string>;
}

export default Options;
