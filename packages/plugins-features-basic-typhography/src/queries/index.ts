import { Node, Value, Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions, BlockTypes } from "../options";

function isTypography(types: string[], node: Node) {
  return Block.isBlock(node) && types.includes(node.type);
}

function currentTypography(
  editor: Editor,
  types: Partial<BlockTypes>,
  value: Value
) {
  const blockType = Object.entries(types).find(([type, typeName]) => {
    const selectedBlocks: List<Block> = List(
      editor.getHighestSelectedBlocks(value)
    );
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

export default function createQueries(opts: TypeOptions) {
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
    isTypography: (editor: Editor, node: Node) =>
      isTypography(slateBlockTypes, node),
    currentTypography: (editor: Editor, value: Value) =>
      currentTypography(editor, validBlockTypes, value)
  };
}
