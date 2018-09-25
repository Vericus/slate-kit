import { Change, Block } from "slate";
import { TypeOption } from "../options";

export default function updateImageSource(opts: TypeOption, utils) {
  const { mediaTypes } = opts;
  const { image } = mediaTypes || { image: undefined };
  if (image) {
    const { srcField, type } = image;
    return (change: Change, block: Block, src) => {
      if (block.type === type) {
        change.setNodeByKey(block.key, {
          data: block.data.set(srcField, src)
        });
      }
    };
  } else {
    return (change: Change) => change;
  }
}
