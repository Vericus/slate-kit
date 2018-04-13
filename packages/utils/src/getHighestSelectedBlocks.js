// @flow
import { type Value } from "slate";
import { List } from "immutable";

export default function getHighestSelectedBlocks(value: Value) {
  let range = value.selection;
  if (range.isBackward) {
    range = range.flip();
  }
  const { document } = value;
  if (range.startKey && range.endKey) {
    let startBlock = document.getClosestBlock(range.startKey);
    let endBlock = document.getClosestBlock(range.endKey);
    if (startBlock && endBlock && startBlock !== endBlock) {
      if (range.hasAnchorAtEndOf(startBlock)) {
        startBlock = document.getNextBlock(startBlock.key);
      }
      if (range.hasFocusAtStartOf(endBlock)) {
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
  return undefined;
}
