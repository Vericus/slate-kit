// @flow
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import type { typeOptions } from "./options";

export default function createUtils(opts: typeOptions) {
  const { ordered, unordered } = opts;
  const listTypes = [ordered, unordered];
  const selectedOrderedList = value =>
    getHighestSelectedBlocks(value).filter(node => node.type === ordered);
  const isOrderedNode = node => node.type === ordered;
  const isUnorderedNode = node => node.type === unordered;
  return {
    isListNode: node => listTypes.includes(node.type),
    isOrderedNode,
    isUnorderedNode,
    isOrderedList: value =>
      getHighestSelectedBlocks(value).every(isOrderedNode),
    isUnorderedList: value =>
      getHighestSelectedBlocks(value).every(isUnorderedNode),
    selectedOrderedList
  };
}
