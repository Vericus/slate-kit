// @flow
import { Record } from "immutable";

export type typeOptions = {
  floatBlocks: Array<string>,
  textBlocks: Array<string>,
  alignments: Array<string>,
  dataField: string
};

const defaultOption: typeOptions = {
  floatBlocks: [],
  textBlocks: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four"
  ],
  alignments: ["left", "right", "center", "justify"],
  dataField: "textAlign"
};

class Options extends Record(defaultOption) {
  floatBlocks: Array<string>;
  textBlocks: Array<string>;
  allignments: Array<string>;
  dataField: string;
}

export default Options;
