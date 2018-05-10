// @flow
import { Data } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "./options";

export default function createChanges(opts, utils, pluginsWrapper) {
  const { ordered, unordered } = opts;
  const { isOrderedList, isUnorderedList, selectedOrderedList } = utils;
  const resetBlockStartAt = (change, block) => {
    const data = block.data.toJSON();
    if (data.startAt) delete data.startAt;
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
  const changeListType = (change, type) => {
    const { value } = change;
    const selectedBlocks = getHighestSelectedBlocks(value);
    const shouldUnwrap =
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
  return {
    createListWithType,
    changeListType,
    resetBlockStartAt,
    resetStartAt,
    unwrapList
  };
}
