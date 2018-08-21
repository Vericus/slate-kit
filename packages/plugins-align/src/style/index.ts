import { TypeOptions } from "../options";
import getData from "./getData";

export default function createStyle(opts: TypeOptions) {
  const { dataField } = opts;
  return { getData: (el: HTMLElement) => getData(el, dataField) };
}
