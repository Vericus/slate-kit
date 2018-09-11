import { Record } from "immutable";

export type ListTypes = "orderedlist" | "unorderedlist" | "checklist";

export type BlockTypes = { [key in ListTypes]?: string | null };

export interface TypeOptions {
  blockTypes: BlockTypes;
  externalRenderer: boolean;
  startAtField: string;
  checkField: string;
}

const defaultOptions = {
  blockTypes: {
    orderedlist: "ol-list",
    unorderedlist: "ul-list",
    checklist: "check-list"
  },
  externalRenderer: false,
  startAtField: "startAt",
  checkField: "checked"
};

class Options extends Record(defaultOptions) {
  blockTypes: BlockTypes;
  externalRenderer: boolean;
  startAtField: string;
  checkField: string;
}

export default Options;
