// @flow
import { Record } from "immutable";
import isPlainObject from "is-plain-object";

const defaultOptions = {
  type: undefined,
  styles: undefined,
  data: undefined,
  defaultColor: undefined,
  alpha: 1,
  externalRenderer: false
};

export type typeOptions = {
  type: string,
  alpha?: number,
  data: string,
  styles: Array<string>,
  defaultColor: string,
  externalRenderer: boolean
};

class Options extends Record(defaultOptions, "highlight text option") {
  type: string;
  styles: Array<string>;
  data: string;
  alpha: number;
  defaultColor: string;
  externalRenderer: boolean;

  static create(attrs: any = {}) {
    if (Options.isOptions(attrs)) return attrs;
    if (isPlainObject(attrs)) return Options.fromJSON(attrs);

    throw new Error(
      "`Options.create` only accepts objects, strings or options"
    );
  }

  static fromJSON(object: any) {
    if (Options.isOptions(object)) return object;

    const { type, data, styles, defaultColor, alpha = 1 } = object;
    if (!type || !data || !styles || !defaultColor || !Array.isArray(styles)) {
      throw new Error("Highlight text require type, data and style option");
    }

    if (alpha < 0 || alpha > 1) {
      throw new Error("Alpha value can only go from 0 to 1");
    }

    return new Options({
      type,
      data,
      styles,
      alpha,
      defaultColor
    });
  }

  static isOptions(any: any) {
    return !!(
      any instanceof Record &&
      ["type", "data", "styles", "defaultColor"].every(key => any.has(key))
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
