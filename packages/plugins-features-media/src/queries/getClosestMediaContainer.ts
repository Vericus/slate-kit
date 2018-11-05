import { Block, Document, Node, Editor } from "slate";
import { TypeOption } from "../options";
export default function getClosestMediaContainer(opts: TypeOption) {
  const { type, captionType, mediaTypes } = opts;
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  return imageType
    ? (editor: Editor, document: Document, block: Block) => {
        let mediaBlock: Node | null = block;
        while (
          mediaBlock &&
          Block.isBlock(mediaBlock) &&
          mediaBlock.type !== type
        ) {
          mediaBlock = document.getClosestBlock(mediaBlock.key);
        }
        return Block.isBlock(mediaBlock) && mediaBlock.type === type
          ? mediaBlock
          : undefined;
      }
    : () => {};
}
