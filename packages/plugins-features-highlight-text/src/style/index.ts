import { Editor } from "slate";
import getData from "./getData";
import { TypeOptions } from "../options";

export default function createStyle(options: TypeOptions) {
  const { type, data } = options;
  return {
    getData: (_editor: Editor, el: HTMLElement) => getData(type, data, el),
  };
}
