import { Node, Value, Block } from "slate";
import { List } from "immutable";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { TypeOptions, BlockTypes } from "../options";

function isTypography(types: string[], node: Node) {
  return Block.isBlock(node) && types.includes(node.type);
}

function currentTypography(types: Partial<BlockTypes>, value: Value) {
  const blockType = Object.entries(types).find(([type, typeName]) => {
    const selectedBlocks = List(getHighestSelectedBlocks(value));
    if (selectedBlocks) {
      const headBlock = selectedBlocks.get(0);
      if (headBlock) {
        return !!(
          Block.isBlock(headBlock) &&
          typeName === headBlock.type &&
          type
        );
      }
    }
    return false;
  });
  return blockType ? blockType[1] : "paragraph";
}

function createUtils(opts: TypeOptions) {
  const { blockTypes } = opts;
  const validBlockTypes: { [key: string]: string } = Object.entries(
    blockTypes
  ).reduce((types, [type, typeName]) => {
    if (typeof typeName === "string") {
      return {
        ...types,
        [type]: typeName
      };
    }
    return types;
  }, {});
  const slateBlockTypes = Object.values(validBlockTypes);
  return {
    isTypography: (node: Node) => isTypography(slateBlockTypes, node),
    currentTypography: (value: Value) =>
      currentTypography(validBlockTypes, value)
  };
}

export default createUtils;
export { isTypography, currentTypography };
