import { Record } from "immutable";
import { Change } from "slate";

export interface TypeOptions {
  hotkeys?: string | string[];
  change?: (change: Change) => Change;
}

const defaultOptions: TypeOptions = { hotkeys: undefined, change: undefined };

class Options extends Record(defaultOptions) {
  hotkeys: string | string[];
  change: (change: Change) => Change;
}

export default Options;
