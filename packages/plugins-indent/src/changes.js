// @flow
import type { Value, Change, Block } from "slate";
import { type typeOptions } from "./options";
import { getIndentableBlocks, getIndentationLevel } from "./utils";

function increaseBlockIndent(opts: typeOptions, change: Change, block: Block) {
  const { maxIndentation } = opts;
  const indentLevel = getIndentationLevel(opts, block);
  if (indentLevel + 1 > maxIndentation) return;
  change.setNodeByKey(block.key, {
    data: block.data.set("indentation", indentLevel + 1)
  });
}

function decreaseBlockIndent(opts: typeOptions, change: Change, block: Block) {
  const indentLevel = getIndentationLevel(opts, block);
  if (indentLevel === 0) return;
  let newData;
  if (indentLevel === 1) {
    newData = block.data.delete("indentation");
  } else {
    newData = block.data.set("indentation", indentLevel - 1);
  }
  change.setNodeByKey(block.key, {
    data: newData
  });
}

function increaseIndent(opts, change) {
  const { value } = change;
  getIndentableBlocks(opts, value).forEach(block =>
    increaseBlockIndent(opts, change, block)
  );
}

function decreaseIndent(opts, change) {
  const { value } = change;
  getIndentableBlocks(opts, value).forEach(block =>
    decreaseBlockIndent(opts, change, block)
  );
}

function createChanges(opts: typeOptions) {
  return {
    decreaseBlockIndent: (change, block) =>
      decreaseBlockIndent(opts, change, block),
    increaseBlockIndent: (change, block) =>
      increaseBlockIndent(opts, change, block),
    increaseIndent: change => increaseIndent(opts, change),
    decreaseIndent: change => decreaseIndent(opts, change)
  };
}

export default createChanges;
export {
  decreaseBlockIndent,
  increaseBlockIndent,
  decreaseIndent,
  increaseIndent
};
