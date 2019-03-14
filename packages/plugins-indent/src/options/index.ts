import { Record } from "immutable";

export interface TypeOptions {
  tabable: string[];
  indentable: string[];
  maxIndentation: number;
  dataField: string;
  withHandlers: boolean;
  label: string;
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
  dataField: "indentation",
  withHandlers: true,
  label: "indent"
};

class Options extends Record(defaultOptions) {
  public tabable: string[];

  public indentable: string[];

  public maxIndentation: number;

  public dataField: string;

  public withHandlers: boolean;

  public label: string;
}

export default Options;
