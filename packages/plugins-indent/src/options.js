// @flow
import { Record } from "immutable";

export type typeOptions = {
  tabable: Array<string>,
  indentable: Array<string>,
  maxIndentation: number
};

const defaultOptions = {
  tabable: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four"
  ],
  indentable: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four",
    "flat-ordered-list",
    "flat-unordered-list"
  ],
  maxIndentation: 8
};

class Options extends Record(defaultOptions) {
  tabable: Array<string>;
  indentabe: Array<string>;
  maxIndentation: number;
}

export default Options;
