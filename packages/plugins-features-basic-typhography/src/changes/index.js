// @flow
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import type { Change } from "slate";
import type { typeOptions } from "../options";
import { isTypography } from "../utils";

export default function createChanges(pluginOptions: typeOptions) {
  const { blockTypes } = pluginOptions;
  return {
    toggleTypography: (change: Change, type: string) => {
      if (blockTypes.includes(type)) {
        const selectedBlocks = getHighestSelectedBlocks(change.value);
        selectedBlocks.forEach(block => {
          if (isTypography(pluginOptions, block)) {
            change.setNodeByKey(block.key, type);
          } else {
            block.getBlocks().forEach(nodeBlock => {
              if (isTypography(pluginOptions, nodeBlock))
                change.setNodeByKey(nodeBlock.key, type);
            });
          }
        });
        change.focus();
      }
      return change;
    }
  };
}
