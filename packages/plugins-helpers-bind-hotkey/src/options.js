// @flow

import { Record } from "immutable";
import type { Change } from "slate";

export type typeOptions = {
  hotkeys: ?(string | Array<string>),
  change: ?(change: Change) => Change
};

const defaultOptions: typeOptions = { hotkeys: null, change: undefined };

class Options extends Record(defaultOptions) {
  hotkeys: string | Array<string>;
  change: (change: Change) => Change;
}

export default Options;
