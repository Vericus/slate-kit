import { Node, Value, Block } from "slate";
import { List } from "immutable";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { TypeOptions } from "../options";

function isTypography(opts: TypeOptions, node: Node) {
  const { blockTypes } = opts;
  return Block.isBlock(node) && blockTypes.includes(node.type);
}

function currentTypography(opts: TypeOptions, value: Value) {
  const { blockTypes } = opts;
  return (
    blockTypes.find(t => {
      const selectedBlocks = List(getHighestSelectedBlocks(value));
      if (selectedBlocks) {
        const headBlock = selectedBlocks.get(0);
        if (headBlock) {
          return Block.isBlock(headBlock) && t === headBlock.type;
        }
      }
      return false;
    }) || "paragraph"
  );
}

function createUtils(opts: TypeOptions) {
  return {
    isTypography: (node: Node) => isTypography(opts, node),
    currentTypography: (value: Value) => currentTypography(opts, value)
  };
}

export default createUtils;
export { isTypography, currentTypography };
