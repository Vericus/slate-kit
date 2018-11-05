import { Record } from "immutable";
import { Editor } from "slate";

export interface TypeOptions {
  hotkeys?: string | string[];
  commandName?: string;
  commandArgs?: any[];
}

const defaultOptions: TypeOptions = {
  hotkeys: undefined,
  commandName: undefined,
  commandArgs: undefined
};

class Options extends Record(defaultOptions) {
  hotkeys: string | string[];
  commandName: string;
  commandArgs?: any[];
}

export default Options;
