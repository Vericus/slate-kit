import { Record } from "immutable";

export interface TypeOptions {
  ordered?: string;
  unordered?: string;
  checkList?: string;
  startAtField?: string;
  checkField?: string;
  changes?: object;
}

const defaultOptions = {
  ordered: "ol-list",
  unordered: "ul-list",
  checkList: "check-list",
  startAtField: "startAt",
  checkField: "checked",
  changes: {}
};

class Options extends Record(defaultOptions) {
  ordered: string;
  unordered: string;
  checkList: string;
  startAtField: string;
  checkField: string;
  changes: object;
}

export default Options;
