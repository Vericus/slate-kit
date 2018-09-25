import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Change, Block } from "slate";
import { TypeOptions } from "../options";
import { isTypography } from "../utils";

export default function createChanges(pluginOptions: TypeOptions) {
  const { blockTypes } = pluginOptions;
  const validBlockTypes: { [key: string]: string } = Object.entries(
    blockTypes
  ).reduce((types, [type, typeName]) => {
    if (typeof typeName === "string") {
      return {
        ...types,
        [type]: typeName
      };
    }
    return types;
  }, {});
  const slateBlockTypes = Object.values(validBlockTypes);
  return {
    toggleTypography: (change: Change, type: string) => {
      if (slateBlockTypes.includes(type)) {
        const selectedBlocks = getHighestSelectedBlocks(change.value);
        selectedBlocks.toArray().forEach(block => {
          if (!Block.isBlock(block)) return;
          if (isTypography(slateBlockTypes, block)) {
            change.setNodeByKey(block.key, type);
          } else {
            block.getBlocks().forEach(nodeBlock => {
              if (
                Block.isBlock(nodeBlock) &&
                isTypography(slateBlockTypes, nodeBlock)
              ) {
                change.setNodeByKey(nodeBlock.key, type);
              }
            });
          }
        });
        change.focus();
      }
      return change;
    }
  };
}
