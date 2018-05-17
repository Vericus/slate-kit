// @flow
import type { Node, Block, Value } from "slate";
import getAlignBlocks, { getAlignBlocksInBlock } from "./getAlignBlocks";
import getAlignment from "./getAlignment";
import isAligned from "./isAligned";
import isAlignable from "./isAlignable";
import type { typeOptions } from "../options";

function createUtils(opts: typeOptions) {
  return {
    getAlignBlocks: (value: Array<Node>): Array<Node> =>
      getAlignBlocks(opts, value),
    getAlignBlocksInBlock: (node: Array<Node>): Array<Node> =>
      getAlignBlocksInBlock(opts, node),
    getAlignment: (block: Block) => getAlignment(opts, block),
    isAligned: (value: Value, alignment: string) =>
      isAligned(opts, value, alignment),
    isAlignable: (value: Value) => isAlignable(opts, value)
  };
}
export default createUtils;
