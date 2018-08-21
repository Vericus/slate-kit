import { Record } from "immutable";

export interface TypeOptions {
  tabable: string[];
  indentable: string[];
  maxIndentation: number;
  dataField: string;
}

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
    "ol-list",
    "ul-list",
    "check-list"
  ],
  maxIndentation: 8,
  dataField: "indentation"
};

class Options extends Record(defaultOptions) {
  tabable: string[];
  indentable: string[];
  maxIndentation: number;
  dataField: string;
}

export default Options;
