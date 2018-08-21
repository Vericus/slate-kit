import { Record } from "immutable";
import { Change } from "slate";

export interface KeyBinding {
  hotkeys: string;
  changeName?: string;
  change?: (change: Change) => void;
}

export interface TypeOptions {
  externalRenderer: boolean;
  keyBindings: KeyBinding[];
  marks: string[];
}

const defaultOption: TypeOptions = {
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
  keyBindings: KeyBinding[];
  marks: string[];
}

export default Options;
