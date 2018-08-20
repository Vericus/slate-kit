import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Value, Block } from "slate";
import { TypeOptions } from "../options";

function isIndentable(opts: TypeOptions, block: Block) {
  const { indentable } = opts;
  return indentable.includes(block.type);
}

function getIndentableBlocks(opts: TypeOptions, value: Value) {
  return getHighestSelectedBlocks(value).filter(block =>
    isIndentable(opts, block)
  );
}

function getIndentationLevel(opts: TypeOptions, block: Block) {
  const { dataField } = opts;
  return block.data.get(dataField) || 0;
}

function canBeOutdented(opts: TypeOptions, value: Value) {
  const indentableBlocks = getIndentableBlocks(opts, value);
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some(block => {
    const indentation = getIndentationLevel(opts, block);
    return indentation > 0;
  });
}

function canBeIndented(opts: TypeOptions, value: Value) {
  const { maxIndentation } = opts;
  const indentableBlocks = getIndentableBlocks(opts, value);
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some(block => {
    const indentation = getIndentationLevel(opts, block);
    return indentation < maxIndentation;
  });
}

function createUtils(opts: TypeOptions) {
  return {
    getIndentationLevel: (block: Block) => getIndentationLevel(opts, block),
    isIndentable: (block: Block) => isIndentable(opts, block),
    getIndentableBlocks: (value: Value) => getIndentableBlocks(opts, value),
    canBeIndented: (value: Value) => canBeIndented(opts, value),
    canBeOutdented: (value: Value) => canBeOutdented(opts, value)
  };
}

export default createUtils;
export {
  getIndentationLevel,
  isIndentable,
  getIndentableBlocks,
  canBeIndented,
  canBeOutdented
};
