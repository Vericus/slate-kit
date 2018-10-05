import { Block } from "slate";
import { TypeOption } from "../options";

export default function hideCaption(opts: TypeOption) {
  const { captionHideField } = opts;
  return captionHideField
    ? (block: Block) => {
        return block.data.get(captionHideField);
      }
    : () => false;
}
