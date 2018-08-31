import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Change, Block, Node } from "slate";
import { List } from "immutable";
import { TypeOptions } from "../options";
import {
  isOrderedList,
  isUnorderedList,
  isCheckList,
  selectedOrderedList
} from "../utils";

function resetBlockStartAt(opts: TypeOptions, change: Change, block: Block) {
  const { startAtField } = opts;
  change.setNodeByKey(block.key, {
    data: block.data.delete(startAtField)
  });
}

function resetBlockChecked(opts: TypeOptions, change: Change, block: Block) {
  const { checkField } = opts;
  change.setNodeByKey(block.key, {
    data: block.data.delete(checkField)
  });
}

function resetStartAt(opts: TypeOptions, change: Change) {
  const { value } = change;
  const selectedBlocks = selectedOrderedList(opts, value);
  change.withoutNormalization(c => {
    selectedBlocks.forEach(block => {
      Block.isBlock(block) && resetBlockStartAt(opts, c, block);
    });
  });
}

function resetChecked(opts: TypeOptions, change: Change) {
  const { value } = change;
  const selectedBlocks = selectedOrderedList(opts, value);
  change.withoutNormalization(c => {
    selectedBlocks.forEach(block => {
      Block.isBlock(block) && resetBlockChecked(opts, c, block);
    });
  });
}

function changeListType(opts: TypeOptions, change: Change, type: string) {
  const { ordered, unordered, checkList } = opts;
  const { value } = change;
  const selectedBlocks = List(getHighestSelectedBlocks(value));
  const shouldUnwrap =
    (type === checkList && isCheckList(opts, value)) ||
    (type === ordered && isOrderedList(opts, value)) ||
    (type === unordered && isUnorderedList(opts, value));
  if (shouldUnwrap) {
    change.withoutNormalization(c =>
      selectedBlocks.forEach(block => {
        if (Block.isBlock(block)) {
          c.setNodeByKey(block.key, "paragraph");
        }
      })
    );
  } else {
    change.withoutNormalization(c => {
      selectedBlocks.forEach(block => {
        if (Block.isBlock(block)) {
          c.setNodeByKey(block.key, type);
          resetBlockStartAt(opts, c, block);
          resetBlockChecked(opts, c, block);
        }
      });
    });
  }
  return change;
}

function createListWithType(
  opts: TypeOptions,
  change: Change,
  type: string,
  startAt?: number
) {
  const { startAtField } = opts;
  const { value } = change;
  const { startBlock } = value;
  change.withoutNormalization(c => {
    if (startAt) {
      c.setNodeByKey(startBlock.key, {
        type,
        data: startBlock.data.set(startAtField, startAt)
      });
    } else {
      c.setNodeByKey(startBlock.key, type);
    }
  });
  return change;
}

function unwrapList(
  opts: TypeOptions,
  change: Change,
  isDelete: boolean,
  pluginsWrapper: any
) {
  const { canBeOutdented } = pluginsWrapper.getUtils("indent");
  const { decreaseIndent } = pluginsWrapper.getChanges("indent");
  const { value } = change;
  const { startBlock } = value;
  if (canBeOutdented(value)) {
    decreaseIndent(change);
  } else if (isDelete) {
    change.setNodeByKey(startBlock.key, "paragraph");
  }
}

function toggleCheck(opts: TypeOptions, change: Change, block: Block) {
  const { checkField } = opts;
  return change.setNodeByKey(block.key, {
    data: block.data.set(checkField, !block.data.get(checkField))
  });
}

function createChanges(opts: TypeOptions, pluginsWrapper: any) {
  return {
    createListWithType: (change: Change, type: string, startAt: number) =>
      createListWithType(opts, change, type, startAt),
    changeListType: (change: Change, type: string) =>
      changeListType(opts, change, type),
    resetBlockStartAt: (change: Change, block: Block) =>
      resetBlockStartAt(opts, change, block),
    resetBlockChecked: (change: Change, block: Block) =>
      resetBlockChecked(opts, change, block),
    resetChecked: (change: Change) => resetChecked(opts, change),
    resetStartAt: (change: Change) => resetStartAt(opts, change),
    toggleCheck: (change: Change, block: Block) =>
      toggleCheck(opts, change, block),
    unwrapList: (change: Change, isDelete: boolean) =>
      unwrapList(opts, change, isDelete, pluginsWrapper)
  };
}

export default createChanges;
export {
  createListWithType,
  changeListType,
  resetBlockChecked,
  resetBlockStartAt,
  resetChecked,
  resetStartAt,
  toggleCheck,
  unwrapList
};
