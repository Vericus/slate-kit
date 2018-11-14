import { Block, Editor } from "slate";
import { TypeOption } from "../options";

export default function hideCaption(opts: TypeOption) {
  const { captionHideField } = opts;
  return captionHideField
    ? (editor: Editor, block: Block) => block.data.get(captionHideField)
    : () => false;
}
