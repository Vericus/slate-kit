import { Block, Node, Editor } from "slate";
import { TypeOption } from "../options";
import hideCaption from "./hideCaption";

export default function hasCaption(opts: TypeOption) {
  const { type, captionType, mediaTypes } = opts;
  const captionHidden = hideCaption(opts);
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  return imageType
    ? (editor: Editor, block: Block) => {
        let mediaBlock: Node | null = block;
        while (
          mediaBlock &&
          Block.isBlock(mediaBlock) &&
          mediaBlock.type !== type
        ) {
          mediaBlock = editor.value.document.getClosestBlock(mediaBlock.key);
        }
        return Block.isBlock(mediaBlock) && mediaBlock.type === type
          ? mediaBlock.nodes.some(n =>
              n
                ? Block.isBlock(n) &&
                  n.type === captionType &&
                  !captionHidden(editor, n)
                : false
            )
          : false;
      }
    : () => {};
}
