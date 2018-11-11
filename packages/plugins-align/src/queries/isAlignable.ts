import { Editor } from "slate";
import { TypeOptions } from "../options";

export default function isAlignable(opts: TypeOptions, editor: Editor) {
  return editor.getAlignBlocks().length !== 0;
}
