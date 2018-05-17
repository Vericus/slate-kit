// @flow
import type { Value, Node } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import type { typeOptions } from "../options";

function getAlignBlocksInBlock(opts, node) {
  if (node.object !== "block") return [];
  const { textBlocks, floatBlocks } = opts;
  if (node.isLeafBlock()) {
    if (textBlocks.includes(node.type) || floatBlocks.includes(node.type)) {
      return [node];
    }
    return [];
  }
  return node.nodes.reduce((alignBlocks, block) => {
    return [...alignBlocks, ...getAlignBlocksInBlock(opts, block)];
  }, []);
}

function getAlignBlocks(opts: typeOptions, value: Value) {
  const maybeAlignBlocks = getHighestSelectedBlocks(value);
  if (maybeAlignBlocks.size === 0) return [];
  return maybeAlignBlocks.reduce(
    (alignBlocks, block) => [
      ...alignBlocks,
      ...getAlignBlocksInBlock(opts, block)
    ],
    []
  );
}

export default getAlignBlocks;
export { getAlignBlocksInBlock };
