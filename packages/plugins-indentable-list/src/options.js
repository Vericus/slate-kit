// @flow
import { Record } from "immutable";

export type typeOptions = {
  ordered: string,
  unordered: string,
  externalRenderer: boolean
};

const defaultOptions = {
  ordered: "ol-list",
  unordered: "ul-list",
  externalRenderer: false
};

class Options extends Record(defaultOptions) {
  ordered: string;
  unordered: string;
  externalRenderer: boolean;
}

export default Options;
