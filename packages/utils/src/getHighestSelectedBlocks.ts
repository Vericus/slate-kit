import { Value, Selection, Block, Document } from "slate";
import { List } from "immutable";

export default function getHighestSelectedBlocks(
  value: Value
): List<Block | null> {
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
      } else if (startBlock === endBlock) {
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
          return List(ancestor.nodes.slice(startPath[0], endPath[0]));
        }
      }
      return List([]);
    }
  } catch (e) {
    return List([]);
  }
  return List([]);
}
