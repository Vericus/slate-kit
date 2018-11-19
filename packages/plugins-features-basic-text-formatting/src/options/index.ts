import { Record } from "immutable";

export interface KeyBinding {
  hotkeys: string;
  commandName?: string;
}

export type MarkTypes = "bold" | "italic" | "underline" | "strikethrough";

export type TextMark = { [key in MarkTypes]?: string | null };

export interface TypeOptions {
  renderer?: (...args: any[]) => any;
  keyBindings: KeyBinding[];
  marks: TextMark;
  withHandlers: boolean;
  label: string;
}

const defaultOption: TypeOptions = {
  keyBindings: [
    { hotkeys: "mod+b", commandName: "toggleBold" },
    { hotkeys: "mod+i", commandName: "toggleItalic" },
    { hotkeys: "mod+u", commandName: "toggleUnderline" }
  ],
  marks: {
    bold: "bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "strikethrough"
  },
  renderer: undefined,
  withHandlers: true,
  label: "basic-text-formatting"
};

class Options extends Record(defaultOption) {
  renderer: (...args: any[]) => any;
  keyBindings: KeyBinding[];
  marks: TextMark;
  withHandlers: boolean;
  label: string;

  static create(option: Partial<TypeOptions>): TypeOptions {
    const options = {
      ...defaultOption,
      marks: {
        ...defaultOption.marks,
        ...(option.marks ? option.marks : {})
      },
      keyBindings: [
        ...defaultOption.keyBindings,
        ...(option.keyBindings ? option.keyBindings : [])
      ],
      ...option
    };
    return new Options(options);
  }
}

export default Options;
