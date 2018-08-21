import { Value } from "slate";
import { List } from "immutable";

export default function getHighestSelectedBlocks(value: Value) {
  let range = value.selection;
  if (range.isBackward) {
    range = range.flip();
  }
  const { document } = value;
  try {
    if (range.start.key && range.end.key) {
      let startBlock = document.getClosestBlock(range.start.key);
      let endBlock = document.getClosestBlock(range.end.key);
      if (startBlock && endBlock && startBlock !== endBlock) {
        if (range.anchor.isAtEndOfNode(startBlock)) {
          startBlock = document.getNextBlock(startBlock.key);
        }
        if (range.focus.isAtStartOfNode(endBlock)) {
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
      const ancestor = document.getCommonAncestor(startBlock.key, endBlock.key);
      const startPath = ancestor.getPath(startBlock.key);
      const endPath = ancestor.getPath(endBlock.key);

      return ancestor.nodes.slice(startPath[0], endPath[0] + 1);
    }
  } catch (e) {
    return List([]);
  }
  return List([]);
}
