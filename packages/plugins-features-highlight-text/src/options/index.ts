import { Record } from "immutable";
import isPlainObject from "is-plain-obj";

export interface TypeOptions {
  type: string;
  alpha?: number;
  data: string;
  styles: string[];
  defaultColor: string;
  externalRenderer: boolean;
}

const defaultOptions = {
  type: undefined,
  styles: undefined,
  data: undefined,
  defaultColor: undefined,
  alpha: 1,
  externalRenderer: false
};

class Options extends Record(defaultOptions, "highlight text option") {
  type: string;
  styles: string[];
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

  static isOptions(args: any) {
    return !!(
      args instanceof Record &&
      ["type", "data", "styles", "defaultColor"].every(key => args.has(key))
    );
  }
}

export default Options;
