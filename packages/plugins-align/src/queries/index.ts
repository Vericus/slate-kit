import { Node, Block, Editor, QueryHooks } from "slate";
import getAlignBlocks, { getAlignBlocksInBlock } from "./getAlignBlocks";
import getAlignment from "./getAlignment";
import isAligned from "./isAligned";
import isAlignable from "./isAlignable";
import { TypeOptions } from "../options";

export interface AlignUtils extends QueryHooks {
  getAlignBlocks: (editor: Editor) => Node[];
  getAlignBlocksInBlock: (editor: Editor, node: Node) => Node[];
  getAlignment: (editor: Editor, block: Block) => string | undefined;
  isAligned: (editor: Editor, alignment: string) => boolean;
  isAlignable: (editor: Editor) => boolean;
}

function createUtils(opts: TypeOptions): AlignUtils {
  return {
    getAlignBlocks: (editor) => getAlignBlocks(opts, editor),
    getAlignBlocksInBlock: (editor, node) => getAlignBlocksInBlock(opts, node),
    getAlignment: (editor, block) => getAlignment(opts, block),
    isAligned: (editor, alignment) => isAligned(opts, editor, alignment),
    isAlignable: (editor: Editor) => isAlignable(opts, editor),
  };
}
export default createUtils;
