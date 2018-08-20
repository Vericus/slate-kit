// @flow
import { TypeOptions } from "../options";
import getData from "./getData";

export default function createStyle(opts: TypeOptions) {
  return { getData: (el: HTMLElement) => getData(el, opts) };
}
