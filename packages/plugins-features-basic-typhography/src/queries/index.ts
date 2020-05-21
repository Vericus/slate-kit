import { Node, Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions, BlockTypes } from "../options";

function isTypography(types: string[], node: Node) {
  return Block.isBlock(node) && types.includes(node.type);
}

function currentTypography(editor: Editor, types: Partial<BlockTypes>) {
  const blockType = Object.entries(types).find(([type, typeName]) => {
    const selectedBlocks: List<Block> = List(editor.getHighestSelectedBlocks());
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
  const { blockTypes, defaultBlock } = opts;
  const validBlockTypes: { [key: string]: string } = Object.entries(
    blockTypes
  ).reduce((types, [type, typeName]) => {
    if (typeof typeName === "string") {
      return {
        ...types,
        [type]: typeName,
      };
    }
    return types;
  }, {});
  const slateBlockTypes = Object.values(validBlockTypes);
  return {
    isTypography: (editor: Editor, node: Node) =>
      isTypography(slateBlockTypes, node),
    currentTypography: (editor: Editor) =>
      currentTypography(editor, validBlockTypes),
    getDefaultBlock: (editor: Editor) =>
      editor.getNodeType && editor.getNodeType(defaultBlock),
  };
}
