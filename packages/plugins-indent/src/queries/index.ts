import { Value, Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions } from "../options";

function isIndentable(opts: TypeOptions, block: Block) {
  const { indentable } = opts;
  return indentable.includes(block.type);
}

function getIndentableBlocks(opts: TypeOptions, editor: Editor, value: Value) {
  return List(editor.getHighestSelectedBlocks(value)).filter(
    block => Block.isBlock(block) && isIndentable(opts, block)
  );
}

function getIndentationLevel(opts: TypeOptions, editor: Editor, block: Block) {
  const { dataField } = opts;
  return block.data.get(dataField) || 0;
}

function canBeOutdented(opts: TypeOptions, editor: Editor, value: Value) {
  const indentableBlocks = editor.getIndentableBlocks(value);
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some(block => {
    if (!Block.isBlock(block)) return false;
    const indentation = editor.getIndentationLevel(block);
    return indentation > 0;
  });
}

function canBeIndented(opts: TypeOptions, editor: Editor, value: Value) {
  const { maxIndentation } = opts;
  const indentableBlocks = editor.getIndentableBlocks(value);
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some(block => {
    if (!Block.isBlock(block)) return false;
    const indentation = editor.getIndentationLevel(block);
    return indentation < maxIndentation;
  });
}

export default function createQueries(opts: TypeOptions) {
  return {
    getIndentationLevel: (editor: Editor, block: Block) =>
      getIndentationLevel(opts, editor, block),
    isIndentable: (editor: Editor, block: Block) => isIndentable(opts, block),
    getIndentableBlocks: (editor: Editor, value: Value) =>
      getIndentableBlocks(opts, editor, value),
    canBeIndented: (editor: Editor, value: Value) =>
      canBeIndented(opts, editor, value),
    canBeOutdented: (editor: Editor, value: Value) =>
      canBeOutdented(opts, editor, value)
  };
}
