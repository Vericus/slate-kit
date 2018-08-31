import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Change, Block } from "slate";
import { TypeOptions } from "../options";
import { isTypography } from "../utils";

export default function createChanges(pluginOptions: TypeOptions) {
  const { blockTypes } = pluginOptions;
  return {
    toggleTypography: (change: Change, type: string) => {
      if (blockTypes.includes(type)) {
        const selectedBlocks = getHighestSelectedBlocks(change.value);
        Array(selectedBlocks).forEach(block => {
          if (!Block.isBlock(block)) return;
          if (isTypography(pluginOptions, block)) {
            change.setNodeByKey(block.key, type);
          } else {
            block.getBlocks().forEach(nodeBlock => {
              if (
                Block.isBlock(nodeBlock) &&
                isTypography(pluginOptions, nodeBlock)
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
