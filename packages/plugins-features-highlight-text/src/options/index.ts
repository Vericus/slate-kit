import { Record } from "immutable";
import isPlainObject from "is-plain-obj";

export interface TypeOptions {
  renderer?: (...args: any[]) => any;
  name: string;
  type: string;
  marks: {
    [type: string]: string;
  };
  alpha?: number;
  data: string;
  styles: string[];
  defaultColor: string;
  label: string;
}

const defaultOptions = {
  name: undefined,
  marks: undefined,
  type: undefined,
  styles: undefined,
  data: undefined,
  defaultColor: undefined,
  alpha: 1,
  renderer: undefined,
  label: undefined
};

class Options extends Record(defaultOptions, "highlight text option") {
  name: string;
  marks: {
    [type: string]: string;
  };
  type: string;
  styles: string[];
  data: string;
  alpha: number;
  defaultColor: string;
  renderer: (...args: any[]) => any;
  label: string;

  static create(attrs: any = {}) {
    if (Options.isOptions(attrs)) return attrs;
    if (isPlainObject(attrs)) return Options.fromJSON(attrs);

    throw new Error(
      "`Options.create` only accepts objects, strings or options"
    );
  }

  static fromJSON(object: any) {
    if (Options.isOptions(object)) return object;

    const {
      name,
      type,
      data,
      styles,
      defaultColor,
      alpha = 1,
      renderer
    } = object;
    if (!type || !data || !styles || !defaultColor || !Array.isArray(styles)) {
      throw new Error("Highlight text require type, data and style option");
    }

    if (alpha < 0 || alpha > 1) {
      throw new Error("Alpha value can only go from 0 to 1");
    }

    return new Options({
      marks: {
        [type]: type
      },
      type,
      data,
      styles,
      alpha,
      defaultColor,
      name,
      renderer
    });
  }

  static isOptions(args: any) {
    if (args instanceof Record) {
      const record = args as Options;
      return ["marks", "type", "data", "styles", "defaultColor"].every(key =>
        record.has(key)
      );
    }
    return false;
  }
}

export default Options;
