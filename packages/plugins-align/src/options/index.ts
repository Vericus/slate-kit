import { Record } from "immutable";

export interface TypeOptions {
  floatBlocks: string[];
  textBlocks: string[];
  alignments: string[];
  dataField: string;
}

export const defaultOption: TypeOptions = {
  floatBlocks: [],
  textBlocks: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four",
    "blockquote"
  ],
  alignments: ["left", "right", "center", "justify"],
  dataField: "textAlign"
};

class Options extends Record(defaultOption) {
  floatBlocks: string[];
  textBlocks: string[];
  alignments: string[];
  dataField: string;

  static create(option: Partial<TypeOptions>): TypeOptions {
    let options = {
      ...defaultOption,
      ...option
    };
    return new Options(options);
  }
}

export default Options;
