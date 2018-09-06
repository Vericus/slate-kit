import { Record } from "immutable";
import { Change } from "slate";

export interface KeyBinding {
  hotkeys: string;
  changeName?: string;
  change?: (change: Change) => void;
}

export type MarkTypes = "bold" | "italic" | "underline" | "strikethrough";

export type TextMark = { [key in MarkTypes]?: string | null };

export interface TypeOptions {
  externalRenderer: boolean;
  keyBindings: KeyBinding[];
  marks: TextMark;
}

const defaultOption: TypeOptions = {
  keyBindings: [
    { hotkeys: "mod+b", changeName: "toggleBold" },
    { hotkeys: "mod+i", changeName: "toggleItalic" },
    { hotkeys: "mod+u", changeName: "toggleUnderline" }
  ],
  marks: {
    bold: "bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "strikethrough"
  },
  externalRenderer: false
};

class Options extends Record(defaultOption) {
  externalRenderer: boolean;
  keyBindings: KeyBinding[];
  marks: TextMark;
}

export default Options;
