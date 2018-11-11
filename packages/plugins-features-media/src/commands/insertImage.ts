import { Editor, Block, Data, Text } from "slate";
import { List } from "immutable";
import { TypeOption } from "../options";

export default function insertImage(opts: TypeOption, pluginsWrapper) {
  const { type, mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  const { type: imageType, srcField } = image
    ? image
    : { type: undefined, srcField: undefined };
  if (imageType && captionType && srcField) {
    return (editor: Editor, src, temporary) => {
      const defaultBlock = pluginsWrapper.getDefaultBlock();
      const media = Block.create({
        type,
        object: "block",
        nodes: List([
          Block.create({
            type: imageType,
            object: "block",
            data: src ? Data.create({ [srcField]: src }) : undefined
          })
        ])
      });
      editor.insertBlock(media);
      if (defaultBlock) {
        const paragraph = Block.create({
          type: defaultBlock,
          object: "block",
          nodes: List([Text.create("")])
        });
        editor.insertBlock(paragraph);
      }
      editor.focus();
    };
  }
  return (editor: Editor) => undefined;
}
