import { Change, Block, Text } from "slate";
import { TypeOption } from "../options";

export default function toggleCaption(opts: TypeOption, utils) {
  const { type, captionType, mediaTypes, captionHideField } = opts;
  return (change: Change, node?: Block, focus?: boolean) => {
    const media = node
      ? utils.getClosestMediaContainer(change.value.document, node)
      : utils.getSelectedMediaBlock(change.value);

    if (media && Block.isBlock(media)) {
      const caption = media.findDescendant(
        n => Block.isBlock(n) && n.type === captionType
      );
      if (caption && Block.isBlock(caption)) {
        if (captionHideField) {
          const { key: captionKey, data: captionData } = caption;
          const hidden = captionData.get(captionHideField);
          change.setNodeByKey(captionKey, {
            data: captionData.set(captionHideField, !hidden)
          });
          if (focus && hidden) {
            change.moveToEndOfNode(caption).focus();
          }
        } else {
          change.removeNodeByKey(caption.key);
        }
      } else {
        const captionBlock = Block.create({
          type: captionType,
          nodes: [Text.create("")]
        });
        change.insertNodeByKey(media.key, media.nodes.size, captionBlock);
        if (focus) {
          change
            .moveToEndOfNode(media)
            .moveForward(1)
            .focus();
        }
      }
    }
    return change;
  };
}
