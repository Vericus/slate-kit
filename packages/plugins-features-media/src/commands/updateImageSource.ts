import { Editor, Block } from "slate";
import { TypeOption } from "../options";

export default function updateImageSource(opts: TypeOption) {
  const { mediaTypes } = opts;
  const { image } = mediaTypes || { image: undefined };
  if (image) {
    const { srcField, type } = image;
    return (editor: Editor, block: Block, src) => {
      if (block.type === type) {
        editor.setNodeByKey(block.key, {
          data: block.data.set(srcField, src)
        });
      }
    };
  }
}
