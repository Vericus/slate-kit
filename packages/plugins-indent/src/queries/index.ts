import { Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions } from "../options";

function isIndentable(opts: TypeOptions, block: Block) {
  const { indentable } = opts;
  return indentable.includes(block.type);
}

function getIndentableBlocks(opts: TypeOptions, editor: Editor) {
  return List(editor.getHighestSelectedBlocks()).filter(
    (block) => Block.isBlock(block) && isIndentable(opts, block)
  );
}

function getIndentationLevel(opts: TypeOptions, editor: Editor, block: Block) {
  const { dataField } = opts;
  return block.data.get(dataField) || 0;
}

function canBeOutdented(opts: TypeOptions, editor: Editor) {
  const indentableBlocks = editor.getIndentableBlocks();
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some((block) => {
    if (!Block.isBlock(block)) return false;
    const indentation = editor.getIndentationLevel(block);
    return indentation > 0;
  });
}

function canBeIndented(opts: TypeOptions, editor: Editor) {
  const { maxIndentation } = opts;
  const indentableBlocks = editor.getIndentableBlocks();
  if (indentableBlocks.size === 0) return false;
  return indentableBlocks.some((block) => {
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
    getIndentableBlocks: (editor: Editor) => getIndentableBlocks(opts, editor),
    canBeIndented: (editor: Editor) => canBeIndented(opts, editor),
    canBeOutdented: (editor: Editor) => canBeOutdented(opts, editor),
  };
}
