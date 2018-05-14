// @flow
import { Record } from "immutable";

export type typeOptions = {
  floatBlocks?: Array<string>,
  textBlocks?: Array<string>,
  alignments?: Array<string>
};
const defaultOption: typeOptions = {
  floatBlocks: [],
  textBlocks: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four",
    "ul-list",
    "ol-list",
    "check-list"
  ],
  alignments: ["left", "right", "center", "justify"]
};
class Options extends Record(defaultOption) {
  floatBlocks: Array<string>;
  textBlocks: Array<string>;
  allignments: Array<string>;
}

export default Options;
