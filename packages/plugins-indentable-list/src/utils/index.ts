import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Value, Node } from "slate";
import { TypeOptions } from "../options";

function selectedOrderedList(opts: TypeOptions, value: Value) {
  const { ordered } = opts;
  return getHighestSelectedBlocks(value).filter(node => node.type === ordered);
}

function isOrderedNode(opts: TypeOptions, node: Node) {
  const { ordered } = opts;
  return node.type === ordered;
}

function isUnorderedNode(opts: TypeOptions, node: Node) {
  const { unordered } = opts;
  return node.type === unordered;
}

function isCheckNode(opts: TypeOptions, node: Node) {
  const { checkList } = opts;
  return node.type === checkList;
}

function isListNode(opts: TypeOptions, node: Node) {
  const { ordered, unordered, checkList } = opts;
  const listTypes = [ordered, unordered, checkList];
  return listTypes.includes(node.type);
}

function isOrderedList(opts: TypeOptions, value: Value) {
  return getHighestSelectedBlocks(value).every(node =>
    isOrderedNode(opts, node)
  );
}

function isUnorderedList(opts: TypeOptions, value: Value) {
  return getHighestSelectedBlocks(value).every(node =>
    isUnorderedNode(opts, node)
  );
}

function isCheckList(opts: TypeOptions, value: Value) {
  return getHighestSelectedBlocks(value).every(node => isCheckNode(opts, node));
}

function createUtils(opts: TypeOptions) {
  return {
    isListNode: (node: Node) => isListNode(opts, node),
    isOrderedNode: (node: Node) => isOrderedNode(opts, node),
    isUnorderedNode: (node: Node) => isUnorderedNode(opts, node),
    isCheckNode: (node: Node) => isCheckNode(opts, node),
    isOrderedList: (value: Value) => isOrderedList(opts, value),
    isUnorderedList: (value: Value) => isUnorderedList(opts, value),
    isCheckList: (value: Value) => isCheckList(opts, value),
    selectedOrderedList: (value: Value) => selectedOrderedList(opts, value)
  };
}

export default createUtils;
export {
  isListNode,
  isOrderedNode,
  isUnorderedNode,
  isCheckNode,
  isOrderedList,
  isUnorderedList,
  isCheckList,
  selectedOrderedList
};
