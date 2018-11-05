import { Editor } from "slate";
import { TypeOptions } from "../options";
import getAlignBlocks from "./getAlignBlocks";

export default function isAlignable(opts: TypeOptions, editor: Editor) {
  return editor.getAlignBlocks().length !== 0;
}
