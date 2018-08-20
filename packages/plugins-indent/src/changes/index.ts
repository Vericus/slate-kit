import { Change, Block } from "slate";
import { TypeOptions } from "../options";
import { getIndentableBlocks, getIndentationLevel } from "../utils";

function increaseBlockIndent(opts: TypeOptions, change: Change, block: Block) {
  const { dataField } = opts;
  const { maxIndentation } = opts;
  const indentLevel = getIndentationLevel(opts, block);
  if (indentLevel + 1 > maxIndentation) return;
  change.setNodeByKey(block.key, {
    data: block.data.set(dataField, indentLevel + 1)
  });
}

function decreaseBlockIndent(opts: TypeOptions, change: Change, block: Block) {
  const { dataField } = opts;
  const indentLevel = getIndentationLevel(opts, block);
  if (indentLevel === 0) return;
  let newData;
  if (indentLevel === 1) {
    newData = block.data.delete(dataField);
  } else {
    newData = block.data.set(dataField, indentLevel - 1);
  }
  change.setNodeByKey(block.key, {
    data: newData
  });
}

function increaseIndent(opts: TypeOptions, change: Change) {
  const { value } = change;
  getIndentableBlocks(opts, value).forEach(block =>
    increaseBlockIndent(opts, change, block)
  );
}

function decreaseIndent(opts: TypeOptions, change: Change) {
  const { value } = change;
  getIndentableBlocks(opts, value).forEach(block =>
    decreaseBlockIndent(opts, change, block)
  );
}

function createChanges(opts: TypeOptions) {
  return {
    decreaseBlockIndent: (change: Change, block: Block) =>
      decreaseBlockIndent(opts, change, block),
    increaseBlockIndent: (change: Change, block: Block) =>
      increaseBlockIndent(opts, change, block),
    increaseIndent: (change: Change) => increaseIndent(opts, change),
    decreaseIndent: (change: Change) => decreaseIndent(opts, change)
  };
}

export default createChanges;
export {
  decreaseBlockIndent,
  increaseBlockIndent,
  decreaseIndent,
  increaseIndent
};
