// @flow
import { Record } from "immutable";

export type typeOptions = {
  ordered: string,
  unordered: string,
  checkList: string,
  externalRenderer: boolean
};

const defaultOptions = {
  ordered: "ol-list",
  unordered: "ul-list",
  checkList: "check-list",
  externalRenderer: false
};

class Options extends Record(defaultOptions) {
  ordered: string;
  unordered: string;
  checkList: string;
  externalRenderer: boolean;
}

export default Options;
