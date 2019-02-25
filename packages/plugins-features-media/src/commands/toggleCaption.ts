import { Editor, Block, Text } from "slate";
import { TypeOption } from "../options";

export default function toggleCaption(opts: TypeOption) {
  const { captionType, captionHideField } = opts;
  return (editor: Editor, node?: Block, focus?: boolean) => {
    const media = node
      ? editor.getClosestMediaContainer(node)
      : editor.getSelectedMediaBlock();

    if (media && Block.isBlock(media)) {
      const caption = media.findDescendant(
        n => Block.isBlock(n) && n.type === captionType
      );
      if (caption && Block.isBlock(caption)) {
        if (captionHideField) {
          const { key: captionKey, data: captionData } = caption;
          const hidden = captionData.get(captionHideField);
          editor.setNodeByKey(captionKey, {
            data: captionData.set(captionHideField, !hidden)
          });
          if (focus && hidden) {
            editor.moveToEndOfNode(caption).focus();
          }
        } else {
          editor.removeNodeByKey(caption.key);
        }
      } else {
        const captionBlock = Block.create({
          type: captionType,
          nodes: [Text.create("")]
        });
        editor.insertNodeByKey(media.key, media.nodes.size, captionBlock);
        if (focus) {
          editor
            .moveToEndOfNode(media)
            .moveForward(1)
            .focus();
        }
      }
    }
  };
}
