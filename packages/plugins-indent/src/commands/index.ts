import { Editor, Block } from "slate";
import { TypeOptions } from "../options";

function increaseBlockIndent(opts: TypeOptions, editor: Editor, block: Block) {
  const { dataField } = opts;
  const { maxIndentation } = opts;
  const indentLevel = editor.getIndentationLevel(block);
  if (indentLevel + 1 > maxIndentation) return;
  editor.setNodeByKey(block.key, {
    data: block.data.set(dataField, indentLevel + 1),
  });
}

function decreaseBlockIndent(opts: TypeOptions, editor: Editor, block: Block) {
  const { dataField } = opts;
  const indentLevel = editor.getIndentationLevel(block);
  if (indentLevel === 0) return;
  let newData;
  if (indentLevel === 1) {
    newData = block.data.delete(dataField);
  } else {
    newData = block.data.set(dataField, indentLevel - 1);
  }
  editor.setNodeByKey(block.key, {
    data: newData,
  });
}

function increaseIndent(opts: TypeOptions, editor: Editor) {
  const { value } = editor;
  editor
    .getIndentableBlocks(value)
    .forEach(
      (block) =>
        Block.isBlock(block) && increaseBlockIndent(opts, editor, block)
    );
}

function decreaseIndent(opts: TypeOptions, editor: Editor) {
  const { value } = editor;
  editor
    .getIndentableBlocks(value)
    .forEach(
      (block) =>
        Block.isBlock(block) && decreaseBlockIndent(opts, editor, block)
    );
}

function createChanges(opts: TypeOptions) {
  return {
    decreaseBlockIndent: (editor: Editor, block: Block) =>
      decreaseBlockIndent(opts, editor, block),
    increaseBlockIndent: (editor: Editor, block: Block) =>
      increaseBlockIndent(opts, editor, block),
    increaseIndent: (editor: Editor) => increaseIndent(opts, editor),
    decreaseIndent: (editor: Editor) => decreaseIndent(opts, editor),
  };
}

export default createChanges;
export {
  decreaseBlockIndent,
  increaseBlockIndent,
  decreaseIndent,
  increaseIndent,
};
