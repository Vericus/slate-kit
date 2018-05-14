// @flow
import type { Node, Value } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "../options";

function isTypography(opts: typeOptions, node: Node) {
  const { blockTypes } = opts;
  return blockTypes.includes(node.type);
}

function currentTypography(opts: typeOptions, value: Value) {
  const { blockTypes } = opts;
  return (
    blockTypes.find(t => {
      const selectedBlocks = getHighestSelectedBlocks(value);
      if (selectedBlocks) {
        const headBlock = selectedBlocks.get(0);
        if (headBlock) {
          return t === headBlock.type;
        }
      }
      return false;
    }) || "paragraph"
  );
}

function createUtils(opts: typeOptions) {
  return {
    isTypography: node => isTypography(opts, node),
    currentTypography: (value: Value) => currentTypography(opts, value)
  };
}

export default createUtils;
export { isTypography, currentTypography };
