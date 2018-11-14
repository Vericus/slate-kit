import { Record } from "immutable";

export interface KeyBinding {
  hotkeys: string;
  commandName?: string;
}

export type MarkTypes = "bold" | "italic" | "underline" | "strikethrough";

export type TextMark = { [key in MarkTypes]?: string | null };

export interface TypeOptions {
  externalRenderer: boolean;
  keyBindings: KeyBinding[];
  marks: TextMark;
  withHandlers: boolean;
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
  externalRenderer: false,
  withHandlers: true
};

class Options extends Record(defaultOption) {
  externalRenderer: boolean;
  keyBindings: KeyBinding[];
  marks: TextMark;
  withHandlers: boolean;

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
