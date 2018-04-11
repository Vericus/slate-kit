// @flow

import { Record } from "immutable";
import type { Change } from "slate";

export type typeOptions = {
  hotkeys: string | Array<string>,
  change: (change: Change) => Change
};

class Options extends Record({ hotkeys: null, change: () => {} }) {
  hotkeys: string | Array<string>;
  change: (change: Change) => Change;
}

export default Options;
