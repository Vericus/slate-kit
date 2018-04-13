// @flow
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import type { Change } from "slate";
import type { typeOptions } from "../options";

export default function createChanges(pluginOptions: typeOptions, utils: any) {
  const { blockTypes } = pluginOptions;
  const { isTypography } = utils;
  return {
    toggleTypography: (change: Change, type: string) => {
      if (blockTypes.includes(type)) {
        const selectedBlocks = getHighestSelectedBlocks(change.value);
        selectedBlocks.forEach(block => {
          if (isTypography(block)) {
            change.setNodeByKey(block.key, type);
          } else {
            block.getBlocks().forEach(nodeBlock => {
              if (isTypography(nodeBlock))
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
