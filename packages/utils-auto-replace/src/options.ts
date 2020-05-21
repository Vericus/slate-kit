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
  command: (editor: Editor, matches: Matches, next) => next(),
};

class Options extends Record(defaultOption) {
  public trigger: string;

  public before: RegExp;

  public after: RegExp;

  public command: (editor: Editor, matches: Matches, next) => any;

  public static create(option: Partial<TypeOptions>): TypeOptions {
    const options = {
      ...defaultOption,
      ...option,
    };
    return new Options(options);
  }
}

export default Options;
