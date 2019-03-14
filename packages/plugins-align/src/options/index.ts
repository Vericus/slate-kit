import { Record } from "immutable";

export interface TypeOptions {
  floatBlocks: string[];
  textBlocks: string[];
  alignments: string[];
  dataField: string;
  label: string;
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
  dataField: "textAlign",
  label: "align"
};

class Options extends Record(defaultOption) {
  public floatBlocks: string[];

  public textBlocks: string[];

  public alignments: string[];

  public dataField: string;

  public label: string;

  public static create(option: Partial<TypeOptions>): TypeOptions {
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
