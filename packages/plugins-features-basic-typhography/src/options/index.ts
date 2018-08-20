import { Record } from "immutable";

const isPlainObject = require("is-plain-object");

export interface TypeOptions {
  blockTypes: string[];
  defaultBlock: string;
  externalRenderer: boolean;
}

const defaultOptions = {
  blockTypes: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four"
  ],
  defaultBlock: "paragraph",
  externalRenderer: false
};

class Options extends Record(defaultOptions, "Typhography Options") {
  blockTypes: string[];
  defaultBlock: string;
  externalRenderer: boolean;

  static create(attrs: any = {}) {
    if (Options.isOptions(attrs)) return attrs;
    if (isPlainObject(attrs)) return Options.fromJSON(attrs);

    throw new Error("`Options.create` only accepts objects or options");
  }

  static fromJSON(object: any) {
    if (Options.isOptions(object)) return object;
    const options = {
      ...defaultOptions,
      ...object
    };
    const { blockTypes, defaultBlock } = options;
    if (!blockTypes || !defaultBlock || !Array.isArray(blockTypes)) {
      throw new Error(
        "Typhography requires blockTypes and defaultBlock option"
      );
    }

    return new Options(options);
  }

  static isOptions(args: any) {
    return !!(
      args instanceof Record &&
      ["blockTypes", "defaultBlock"].every(key => args.has(key))
    );
  }
}

export default Options;
