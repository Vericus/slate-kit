import { Change, Block } from "slate";
import { TypeOption } from "../options";

export default function toggleCaption(opts: TypeOption, utils) {
  const { type, captionType, mediaTypes } = opts;
  return (change: Change) => {
    const media = utils.getSelectedMedia(change.value);
    if (media && Block.isBlock(media)) {
      const caption = media.findDescendant(
        node => Block.isBlock(node) && node.type === captionType
      );
      if (caption) {
        change.removeNodeByKey(caption.key);
      } else {
        const captionBlock = Block.create(captionType);
        change.insertNodeByKey(media.key, media.nodes.size, captionBlock);
      }
    }
  };
}
