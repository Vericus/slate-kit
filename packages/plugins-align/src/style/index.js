// @flow
import { type typeOptions } from "../options";
import getData from "./getData";

export default function createStyle(opts: typeOptions) {
  const { dataField } = opts;
  return { getData: (el: HTMLElement) => getData(el, dataField) };
}
