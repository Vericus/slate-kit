import getData from "./getData";
import { TypeOptions } from "../options";

export default function createStyle(options: TypeOptions) {
  const { marks } = options;
  return { getData: (el: HTMLElement) => getData(marks, el) };
}
