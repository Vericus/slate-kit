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
    const options = {
      ...defaultOption,
      ...option,
      floatBlocks: [
        ...defaultOption.floatBlocks,
        ...(option.floatBlocks ? option.floatBlocks : [])
      ],
      alignments: [
        ...defaultOption.alignments,
        ...(option.alignments ? option.alignments : [])
      ],
      textBlocks: [
        ...defaultOption.textBlocks,
        ...(option.textBlocks ? option.textBlocks : [])
      ]
    };
    return new Options(options);
  }
}

export default Options;
