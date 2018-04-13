// @flow
import { Record } from "immutable";
import isPlainObject from "is-plain-object";

const defaultOptions = {
  blockTypes: [
    "paragraph",
    "heading-one",
    "heading-two",
    "heading-three",
    "heading-four"
  ],
  defaultBlock: "paragraph"
};

export type typeOptions = {
  blockTypes: Array<string>,
  defaultBlock: string
};

class Options extends Record(defaultOptions, "Typhography Options") {
  blockTypes: Array<string>;
  defaultBlock: string;

  static create(attrs: any = {}) {
    if (Options.isOptions(attrs)) return attrs;
    if (isPlainObject(attrs)) return Options.fromJSON(attrs);

    throw new Error("`Options.create` only accepts objects or options");
  }

  static fromJSON(object: any) {
    if (Options.isOptions(object)) return object;

    const { blockTypes, defaultBlock } = object;
    if (!blockTypes || !defaultBlock || !Array.isArray(blockTypes)) {
      throw new Error(
        "Typhography requires blockTypes and defaultBlock option"
      );
    }

    return new Options({
      blockTypes,
      defaultBlock
    });
  }

  static isOptions(any: any) {
    return !!(
      any instanceof Record &&
      ["blockTypes", "defaultBlock"].every(key => any.has(key))
    );
  }

  /**
   * Alias `toJS`.
   */

  toJS(options: any) {
    return this.toJSON(options);
  }
}

export default Options;
