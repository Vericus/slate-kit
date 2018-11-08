import { Record } from "immutable";
import { Editor } from "slate";

export interface Matches {
  beforeMatches?: any[] | null;
  afterMatches?: any[] | null;
}

export interface TypeOptions {
  trigger: string;
  before: RegExp | undefined;
  after: RegExp | undefined;
  command: (editor: Editor, matches: Matches, next) => any;
}

const defaultOption: TypeOptions = {
  trigger: " ",
  before: undefined,
  after: undefined,
  command: (editor: Editor, matches: Matches, next) => next()
};

class Options extends Record(defaultOption) {
  trigger: string;
  before: RegExp;
  after: RegExp;
  command: (editor: Editor, matches: Matches, next) => any;

  static create(option: Partial<TypeOptions>): TypeOptions {
    const options = {
      ...defaultOption,
      ...option
    };
    return new Options(options);
  }
}

export default Options;
