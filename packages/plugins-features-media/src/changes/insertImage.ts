import { Change, Block, Data, Text } from "slate";
import { List } from "immutable";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { TypeOption } from "../options";

export default function insertImage(opts: TypeOption, utils, pluginsWrapper) {
  const { type, mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  const { type: imageType, srcField } = image
    ? image
    : { type: undefined, srcField: undefined };
  if (imageType && captionType && srcField) {
    return (change: Change, src, temporary) => {
      const defaultBlock = pluginsWrapper.getDefaultBlock();
      const { value } = change;
      const { document, selection } = value;
      const { isExpanded } = selection;
      const selectedBlocks = getHighestSelectedBlocks(change.value);
      if (selectedBlocks) {
        const lastSelectedBlock = selectedBlocks.last();
        const blockPath = document.getPath(lastSelectedBlock.key);
        let blockIndex;
        if (List.isList(blockPath)) {
          blockIndex = (blockPath as List<number>).first();
        }
        const media = Block.create({
          type,
          object: "block",
          nodes: List([
            Block.create({
              type: imageType,
              object: "block",
              data: src ? Data.create({ [srcField]: src }) : undefined
            }),
            Block.create({ type: captionType, object: "block" })
          ])
        });
        change.insertBlock(media);
        if (defaultBlock) {
          const paragraph = Block.create({
            type: defaultBlock,
            object: "block",
            nodes: List([Text.create("")])
          });
          change.insertBlock(paragraph);
        }
        change.focus();
      }
      return change;
    };
  } else {
    return (change: Change) => change;
  }
}
