import { Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions } from "../options";

function resetBlockStartAt(opts: TypeOptions, editor: Editor, block: Block) {
  const { startAtField } = opts;
  if (block) {
    editor.setNodeByKey(block.key, {
      data: block.data.delete(startAtField)
    });
  }
}

function resetBlockChecked(opts: TypeOptions, editor: Editor, block: Block) {
  const { checkField } = opts;
  if (block) {
    editor.setNodeByKey(block.key, {
      data: block.data.delete(checkField)
    });
  }
}

function resetStartAt(opts: TypeOptions, editor: Editor) {
  const { value } = editor;
  const selectedBlocks = editor.selectedOrderedList(value);
  editor.withoutNormalizing(c => {
    selectedBlocks.forEach(
      block => Block.isBlock(block) && editor.resetBlockStartAt(block)
    );
  });
}

function resetChecked(opts: TypeOptions, editor: Editor) {
  const { value } = editor;
  const selectedBlocks = editor.selectedOrderedList(value);
  editor.withoutNormalizing(e => {
    selectedBlocks.forEach(
      block => Block.isBlock(block) && editor.resetBlockChecked(block)
    );
  });
}

function createChangeListType(opts: TypeOptions) {
  const { blockTypes } = opts;
  const { orderedlist, unorderedlist, checklist } = blockTypes;
  return (editor: Editor, type: string) => {
    const { value } = editor;
    const selectedBlocks: List<Block> = List(
      editor.getHighestSelectedBlocks(value)
    );
    const shouldUnwrap =
      (type === checklist && editor.isCheckList(value)) ||
      (type === orderedlist && editor.isOrderedList(value)) ||
      (type === unorderedlist && editor.isUnorderedList(value));
    if (shouldUnwrap) {
      editor.withoutNormalizing(e =>
        selectedBlocks.forEach(block => {
          if (block && Block.isBlock(block)) {
            e.setToDefaultNodeByKey(block.key);
          }
        })
      );
    } else {
      editor.withoutNormalizing(e => {
        selectedBlocks.forEach(block => {
          if (block && Block.isBlock(block)) {
            e.setNodeByKey(block.key, type);
            e.resetBlockStartAt(block);
            e.resetBlockChecked(block);
          }
        });
      });
    }
  };
}

function createListWithType(
  opts: TypeOptions,
  editor: Editor,
  type: string,
  startAt?: number
) {
  const { startAtField } = opts;
  const { value } = editor;
  const { startBlock } = value;
  editor.withoutNormalizing(c => {
    if (startAt) {
      c.setNodeByKey(startBlock.key, {
        type,
        data: startBlock.data.set(startAtField, startAt)
      });
    } else {
      c.setNodeByKey(startBlock.key, type);
    }
  });
}

function unwrapList(opts: TypeOptions, editor: Editor, isDelete: boolean) {
  const { value } = editor;
  const { startBlock } = value;
  if (editor.canBeOutdented(value)) {
    editor.decreaseIndent();
  } else if (isDelete) {
    editor.setToDefaultNodeByKey(startBlock.key);
  }
}

function toggleCheck(opts: TypeOptions, editor: Editor, block: Block) {
  const { checkField } = opts;
  return editor.setNodeByKey(block.key, {
    data: block.data.set(checkField, !block.data.get(checkField))
  });
}

export default function createCommands(opts: TypeOptions, pluginsWrapper: any) {
  const changeListType = createChangeListType(opts);
  return {
    createListWithType: (editor: Editor, type: string, startAt: number) =>
      createListWithType(opts, editor, type, startAt),
    changeListType,
    resetBlockStartAt: (editor: Editor, block: Block) =>
      resetBlockStartAt(opts, editor, block),
    resetBlockChecked: (editor: Editor, block: Block) =>
      resetBlockChecked(opts, editor, block),
    resetChecked: (editor: Editor) => resetChecked(opts, editor),
    resetStartAt: (editor: Editor) => resetStartAt(opts, editor),
    toggleCheck: (editor: Editor, block: Block) =>
      toggleCheck(opts, editor, block),
    unwrapList: (editor: Editor, isDelete: boolean) =>
      unwrapList(opts, editor, isDelete)
  };
}
