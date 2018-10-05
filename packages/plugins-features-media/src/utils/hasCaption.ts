import { Block, Node, Document } from "slate";
import { TypeOption } from "../options";
import hideCaption from "./hideCaption";

export default function hasCaption(opts: TypeOption) {
  const { type, captionType, mediaTypes } = opts;
  const captionHidden = hideCaption(opts);
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  return imageType
    ? (document: Document, block: Block) => {
        let mediaBlock: Node | null = block;
        while (
          mediaBlock &&
          Block.isBlock(mediaBlock) &&
          mediaBlock.type !== type
        ) {
          mediaBlock = document.getClosestBlock(mediaBlock.key);
        }
        return Block.isBlock(mediaBlock) && mediaBlock.type === type
          ? mediaBlock.nodes.some(
              n =>
                n
                  ? Block.isBlock(n) &&
                    n.type === captionType &&
                    !captionHidden(n)
                  : false
            )
          : false;
      }
    : () => {};
}
