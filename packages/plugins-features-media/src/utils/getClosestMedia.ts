import { Block, Document, Node } from "slate";
import { TypeOption } from "../options";
export default function getClosestMedia(opts: TypeOption) {
  const { type, captionType, mediaTypes } = opts;
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  return imageType
    ? (document: Document, block: Block) => {
        let mediaBlock: Node | null = block;
        while (
          mediaBlock &&
          Block.isBlock(mediaBlock) &&
          mediaBlock.type !== imageType
        ) {
          if (mediaBlock.type === type) {
            const child = document.getChild(mediaBlock.key);
            if (child) {
              mediaBlock = child.first();
            } else {
              break;
            }
          } else {
            mediaBlock = document.getPreviousSibling(mediaBlock.key);
          }
        }
        return Block.isBlock(mediaBlock) && mediaBlock.type === imageType
          ? mediaBlock
          : undefined;
      }
    : () => {};
}
