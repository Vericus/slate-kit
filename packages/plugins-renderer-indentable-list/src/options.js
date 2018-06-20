// @flow
import { Record } from "immutable";

export type typeOptions = {
  ordered?: string,
  unordered?: string,
  checkList?: string,
  startAtField?: string,
  checkField?: string
};

const defaultOptions = {
  ordered: "ol-list",
  unordered: "ul-list",
  checkList: "check-list",
  startAtField: "startAt",
  checkField: "checked"
};

class Options extends Record(defaultOptions) {
  ordered: string;
  unordered: string;
  checkList: string;
  startAtField: string;
  checkField: string;
}

export default Options;
