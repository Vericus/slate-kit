import { Editor } from "slate";
import { TypeOptions } from "../options";

export default function isAligned(
  opts: TypeOptions,
  editor: Editor,
  alignment: string
) {
  const alignBlocks = editor.getAlignBlocks(opts);
  return (
    alignBlocks.length !== 0 &&
    alignBlocks.every(
      block => block && editor.getAlignment(block) === alignment
    )
  );
}
