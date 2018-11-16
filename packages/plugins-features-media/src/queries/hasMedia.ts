import { Editor, Block } from "slate";
import { TypeOption } from "../options";

export default function hasMedia(opts: TypeOption) {
  const { captionType, type, mediaTypes } = opts;
  const imageType = mediaTypes && mediaTypes.image;
  const types = [captionType, type, ...[imageType ? imageType.type : []]];
  return (editor: Editor) => {
    if (editor.getHighestSelectedBlocks) {
      return editor
        .getHighestSelectedBlocks()
        .some((block: Block) => types.includes(block.type));
    }
    return false;
  };
}
