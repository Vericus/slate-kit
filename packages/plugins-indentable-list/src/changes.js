// @flow
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import type { Change, Block, Node } from "slate";
import { type typeOptions } from "./options";
import {
  isOrderedList,
  isUnorderedList,
  isCheckList,
  selectedOrderedList
} from "./utils";

function resetBlockStartAt(opts: typeOptions, change: Change, block: Block) {
  change.setNodeByKey(block.key, {
    data: block.data.delete("startAt")
  });
}

function resetBlockChecked(opts: typeOptions, change: Change, block: Block) {
  change.setNodeByKey(block.key, {
    data: block.data.delete("checked")
  });
}

function resetStartAt(opts: typeOptions, change: Change) {
  const { value } = change;
  const selectedBlocks = selectedOrderedList(opts, value);
  change.withoutNormalization(c => {
    selectedBlocks.forEach(block => {
      resetBlockStartAt(opts, c, block);
    });
  });
}

function resetChecked(opts: typeOptions, change: Change) {
  const { value } = change;
  const selectedBlocks = selectedOrderedList(opts, value);
  change.withoutNormalization(c => {
    selectedBlocks.forEach(block => {
      resetBlockChecked(opts, c, block);
    });
  });
}

function changeListType(opts: typeOptions, change: Change, type: string) {
  const { ordered, unordered, checkList } = opts;
  const { value } = change;
  const selectedBlocks = getHighestSelectedBlocks(opts, value);
  const shouldUnwrap =
    (type === checkList && isCheckList(opts, value)) ||
    (type === ordered && isOrderedList(opts, value)) ||
    (type === unordered && isUnorderedList(opts, value));
  if (shouldUnwrap) {
    change.withoutNormalization(c =>
      selectedBlocks.forEach(block => {
        c.setNodeByKey(block.key, "paragraph");
      })
    );
  } else {
    change.withoutNormalization(c => {
      selectedBlocks.forEach(block => {
        c.setNodeByKey(block.key, type);
        resetBlockStartAt(opts, c, block);
        resetBlockChecked(opts, c, block);
      });
    });
  }
  return change;
}

function createListWithType(
  opts: typeOptions,
  change: Change,
  type: string,
  startAt?: number
) {
  const { value } = change;
  const { startBlock } = value;
  change.withoutNormalization(c => {
    if (startAt) {
      c.setNodeByKey(startBlock.key, {
        type,
        data: startBlock.data.set("startAt", startAt)
      });
    } else {
      c.setNodeByKey(startBlock.key, type);
    }
  });
  return change;
}

function unwrapList(
  opts: typeOptions,
  change: Change,
  isDelete: boolean,
  pluginsWrapper
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

function toggleCheck(opts: typeOptions, change: Change, node: Node) {
  return change.setNodeByKey(node.key, {
    data: node.data.set("checked", !node.data.get("checked"))
  });
}

function createChanges(opts: typeOptions, pluginsWrapper) {
  return {
    createListWithType: (change, type, startAt) =>
      createListWithType(opts, change, type, startAt),
    changeListType: (change, type) => changeListType(opts, change, type),
    resetBlockStartAt: (change, block) =>
      resetBlockStartAt(opts, change, block),
    resetBlockChecked: (change, block) =>
      resetBlockChecked(opts, change, block),
    resetChecked: change => resetChecked(opts, change),
    resetStartAt: change => resetStartAt(opts, change),
    toggleCheck: (change, node) => toggleCheck(opts, change, node),
    unwrapList: (change, isDelete) =>
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
