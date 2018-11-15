import { Record } from "immutable";

export type ListTypes = "orderedlist" | "unorderedlist" | "checklist";

export type BlockTypes = { [key in ListTypes]?: string | null };

export interface TypeOptions {
  blockTypes: BlockTypes;
  externalRenderer: boolean;
  startAtField: string;
  checkField: string;
  withHandlers: boolean;
  label: string;
}

const defaultOptions = {
  blockTypes: {
    orderedlist: "ol-list",
    unorderedlist: "ul-list",
    checklist: "check-list"
  },
  externalRenderer: false,
  startAtField: "startAt",
  checkField: "checked",
  withHandlers: true,
  label: "indentable-list"
};

class Options extends Record(defaultOptions) {
  blockTypes: BlockTypes;
  externalRenderer: boolean;
  startAtField: string;
  checkField: string;
  withHandlers: boolean;
  label: string;
}

export default Options;
