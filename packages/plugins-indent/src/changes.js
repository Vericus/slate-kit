// @flow
import type { Value, Change, Block } from "slate";
import { Data } from "slate";
import { type typeOptions } from "./options";

export default function createChanges(opts: typeOptions, utils) {
  const { indentable, maxIndentation } = opts;
  const { getIndentableBlocks, getIndentationLevel } = utils;
  const increaseBlockIndent = (change: Change, block: Block) => {
    const indentLevel = getIndentationLevel(block);
    if (indentLevel + 1 > maxIndentation) return;
    change.setNodeByKey(block.key, {
      data: Data.fromJSON({
        ...block.data.toJSON(),
        indentation: indentLevel + 1
      })
    });
  };
  const decreaseBlockIndent = (change: Change, block: Block) => {
    const indentLevel = getIndentationLevel(block);
    if (indentLevel === 0) return;
    const newData = {
      ...block.data.toJSON(),
      indentation: indentLevel - 1
    };
    if (newData.indentation === 0) {
      delete newData.indentation;
    }
    change.setNodeByKey(block.key, {
      data: Data.fromJSON(newData)
    });
  };
  return {
    decreaseBlockIndent,
    increaseBlockIndent,
    increaseIndent: (change: Change) => {
      const { value } = change;
      getIndentableBlocks(value).forEach(block =>
        increaseBlockIndent(change, block)
      );
    },
    decreaseIndent: (change: Change) => {
      const { value } = change;
      getIndentableBlocks(value).forEach(block =>
        decreaseBlockIndent(change, block)
      );
    }
  };
}
