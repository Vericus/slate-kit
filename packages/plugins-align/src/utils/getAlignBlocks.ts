import { Value, Node, Block } from "slate";
import { List } from "immutable";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { TypeOptions } from "../options";

function getAlignBlocksInBlock(opts: TypeOptions, node: Node): Block[] {
  if (node.object !== "block") return [];
  const { textBlocks, floatBlocks } = opts;
  if (node.isLeafBlock()) {
    if (textBlocks.includes(node.type) || floatBlocks.includes(node.type)) {
      return [node];
    }
    return [];
  }
  return node.nodes.reduce(
    (alignBlocks: Block[], block: Block) => [
      ...alignBlocks,
      ...getAlignBlocksInBlock(opts, block)
    ],
    []
  );
}

function getAlignBlocks(opts: TypeOptions, value: Value) {
  const maybeAlignBlocks = getHighestSelectedBlocks(value);
  if (maybeAlignBlocks.size === 0) return [];
  return List(maybeAlignBlocks).reduce(
    (alignBlocks: Block[], block: Node) => [
      ...alignBlocks,
      ...getAlignBlocksInBlock(opts, block)
    ],
    []
  );
}

export default getAlignBlocks;
export { getAlignBlocksInBlock };
