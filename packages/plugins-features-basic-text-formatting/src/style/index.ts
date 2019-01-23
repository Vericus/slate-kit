import { Editor } from "slate";
import getData from "./getData";
import { TypeOptions } from "../options";

export default function createStyle(options: TypeOptions) {
  const { marks } = options;
  return { getData: (_editor: Editor, el: HTMLElement) => getData(marks, el) };
}
