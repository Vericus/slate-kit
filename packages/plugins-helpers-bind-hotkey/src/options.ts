import { Record } from "immutable";

export interface TypeOptions {
  hotkeys?: string | string[];
  commandName?: string;
  commandArgs?: any[];
}

const defaultOptions: TypeOptions = {
  hotkeys: undefined,
  commandName: undefined,
  commandArgs: undefined,
};

class Options extends Record(defaultOptions) {
  public hotkeys: string | string[];

  public commandName: string;

  public commandArgs?: any[];
}

export default Options;
