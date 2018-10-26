import { Record } from "immutable";
import { Change } from "slate";

export interface TypeOptions {
  hotkeys?: string | string[];
  change?: (change: Change) => Change;
  changeArgs?: any[];
}

const defaultOptions: TypeOptions = {
  hotkeys: undefined,
  change: undefined,
  changeArgs: undefined
};

class Options extends Record(defaultOptions) {
  hotkeys: string | string[];
  change: (change: Change) => Change;
  changeArgs?: any[];
}

export default Options;
