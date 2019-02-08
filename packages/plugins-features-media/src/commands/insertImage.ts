import { Editor, Block, Data, Text } from "slate";
import { List } from "immutable";
import { TypeOption } from "../options";

export default function insertImage(opts: TypeOption) {
  const { type, mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  const { type: imageType, srcField } = image
    ? image
    : { type: undefined, srcField: undefined };
  if (imageType && captionType && srcField) {
    return (editor: Editor, src) => {
      const defaultBlock = editor.getDefaultBlock();
      const media = Block.create({
        type,
        nodes: List([
          Block.create({
            type: imageType,
            data: src ? Data.create({ [srcField]: src }) : undefined
          })
        ])
      });
      editor.insertBlock(media);
      if (defaultBlock) {
        const paragraph = Block.create({
          type: defaultBlock,
          nodes: List([Text.create("")])
        });
        editor.insertBlock(paragraph);
      }
      editor.focus();
    };
  }
  return (editor: Editor) => undefined;
}
