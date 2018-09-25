import { Node, Block, Value } from "slate";
import getAlignBlocks, { getAlignBlocksInBlock } from "./getAlignBlocks";
import getAlignment from "./getAlignment";
import isAligned from "./isAligned";
import isAlignable from "./isAlignable";
import { TypeOptions } from "../options";

export interface AlignUtils {
  getAlignBlocks: (value: Value) => Node[];
  getAlignBlocksInBlock: (node: Node) => Node[];
  getAlignment: (block: Block) => string | undefined;
  isAligned: (value: Value, alignment: string) => boolean;
  isAlignable: (value: Value) => boolean;
}

function createUtils(opts: TypeOptions): AlignUtils {
  return {
    getAlignBlocks: value => getAlignBlocks(opts, value),
    getAlignBlocksInBlock: node => getAlignBlocksInBlock(opts, node),
    getAlignment: block => getAlignment(opts, block),
    isAligned: (value, alignment) => isAligned(opts, value, alignment),
    isAlignable: (value: Value) => isAlignable(opts, value)
  };
}
export default createUtils;
