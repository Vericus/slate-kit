import { Node, Block, Value } from "slate";
import getAlignBlocks, { getAlignBlocksInBlock } from "./getAlignBlocks";
import getAlignment from "./getAlignment";
import isAligned from "./isAligned";
import isAlignable from "./isAlignable";
import { TypeOptions } from "../options";

function createUtils(opts: TypeOptions) {
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
