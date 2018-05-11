// @flow
import { Data } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "./options";

export default function createChanges(opts, utils, pluginsWrapper) {
  const { ordered, unordered, checkList } = opts;
  const {
    isOrderedList,
    isUnorderedList,
    isCheckList,
    selectedOrderedList
  } = utils;
  const resetBlockStartAt = (change, block) => {
    const data = block.data.toJSON();
    if (data.startAt) delete data.startAt;
    change.setNodeByKey(block.key, {
      data: Data.fromJSON(data)
    });
  };
  const resetBlockChecked = (change, block) => {
    const data = block.data.toJSON();
    if (data.checked) delete data.checked;
    change.setNodeByKey(block.key, {
      data: Data.fromJSON(data)
    });
  };
  const resetStartAt = change => {
    const { value } = change;
    const selectedBlocks = selectedOrderedList(value);
    change.withoutNormalization(c => {
      selectedBlocks.forEach(block => {
        resetBlockStartAt(c, block);
      });
    });
  };
  const resetChecked = change => {
    const { value } = change;
    const selectedBlocks = selectedOrderedList(value);
    change.withoutNormalization(c => {
      selectedBlocks.forEach(block => {
        resetCheckedStartAt(c, block);
      });
    });
  };
  const changeListType = (change, type) => {
    const { value } = change;
    const selectedBlocks = getHighestSelectedBlocks(value);
    const shouldUnwrap =
      (type === checkList && isCheckList(value)) ||
      (type === ordered && isOrderedList(value)) ||
      (type === unordered && isUnorderedList(value));
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
          resetBlockStartAt(c, block);
        });
      });
    }
    return change;
  };
  const createListWithType = (change, type, startAt) => {
    const { value } = change;
    const { startBlock } = value;
    change.withoutNormalization(c => {
      if (startAt) {
        const data = startBlock.data.toJSON();
        data.startAt = startAt;
        c.setNodeByKey(startBlock.key, {
          type,
          data: Data.fromJSON(data)
        });
      } else {
        c.setNodeByKey(startBlock.key, type);
      }
    });
    return change;
  };
  const unwrapList = change => {
    const { canBeOutdented } = pluginsWrapper.getUtils("indent");
    const { decreaseIndent } = pluginsWrapper.getChanges("indent");
    const { value } = change;
    const { startBlock } = value;
    if (canBeOutdented(value)) {
      decreaseIndent(change);
    } else {
      change.setNodeByKey(startBlock.key, "paragraph");
    }
  };
  const toggleCheck = (change, node) => {
    const data = node.data.toJSON();
    data.checked = !data.checked;
    return change.setNodeByKey(node.key, {
      data: Data.fromJSON(data)
    });
  };
  return {
    createListWithType,
    changeListType,
    resetBlockStartAt,
    resetBlockChecked,
    resetChecked,
    resetStartAt,
    toggleCheck,
    unwrapList
  };
}
