import { Value, Selection, Block, Document } from "slate";
import { List } from "immutable";

export default function getHighestSelectedBlocks(value: Value): List<Block> {
  let { selection } = value;
  if (selection.isBackward) {
    selection = selection.flip() as Selection;
  }
  const { document } = value;
  try {
    if (selection.start.key && selection.end.key) {
      let startBlock = document.getClosestBlock(selection.start.key);
      let endBlock = document.getClosestBlock(selection.end.key);
      if (startBlock && endBlock && startBlock !== endBlock) {
        if (selection.anchor.isAtEndOfNode(startBlock)) {
          startBlock = document.getNextBlock(startBlock.key);
        }
        if (selection.focus.isAtStartOfNode(endBlock)) {
          endBlock = document.getPreviousBlock(endBlock.key);
        }
      }
      if (startBlock && !endBlock) {
        return List([startBlock]);
      } else if (endBlock && !startBlock) {
        return List([endBlock]);
      } else if (startBlock === endBlock && startBlock) {
        return List([startBlock]);
      }
      if (startBlock && endBlock) {
        const ancestor = document.getCommonAncestor(
          startBlock.key,
          endBlock.key
        );
        if (ancestor instanceof Block || ancestor instanceof Document) {
          const startPath = ancestor.getPath(startBlock.key);
          const endPath = ancestor.getPath(endBlock.key);
          const blockStartPath = startPath
            ? List(startPath).first()
            : undefined;
          const blockEndPath = endPath ? List(endPath).first() : undefined;
          if (
            blockStartPath !== undefined &&
            blockEndPath !== undefined &&
            typeof blockStartPath === "number" &&
            typeof blockEndPath === "number"
          ) {
            return ancestor.nodes
              .slice(blockStartPath, blockEndPath + 1)
              .filter(node => Block.isBlock(node)) as List<Block>;
          }
        }
      }
      return List([]);
    }
  } catch (e) {
    return List([]);
  }
  return List([]);
}
