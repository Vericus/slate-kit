import { Editor } from "slate";
import { TypeOptions } from "../options";
import getData from "./getData";

export default function createStyle(opts: TypeOptions) {
  return { getData: (_editor: Editor, el: HTMLElement) => getData(el, opts) };
}
