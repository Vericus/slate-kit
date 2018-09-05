import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Value, Node, Block } from "slate";
import { List } from "immutable";
import { TypeOptions } from "../options";

function selectedOrderedList(opts: TypeOptions, value: Value) {
  const { ordered } = opts;
  return List(getHighestSelectedBlocks(value)).filter(
    (node: any) =>
      !!(node && Block.isBlock(node) && node && node.type === ordered)
  );
}

function isOrderedNode(opts: TypeOptions, node: Node) {
  const { ordered } = opts;
  return Block.isBlock(node) && node.type === ordered;
}

function isUnorderedNode(opts: TypeOptions, node: Node) {
  const { unordered } = opts;
  return Block.isBlock(node) && node.type === unordered;
}

function isCheckNode(opts: TypeOptions, node: Node) {
  const { checkList } = opts;
  return Block.isBlock(node) && node.type === checkList;
}

function isListNode(opts: TypeOptions, node: Node) {
  const { ordered, unordered, checkList } = opts;
  const listTypes = [ordered, unordered, checkList];
  return Block.isBlock(node) && listTypes.includes(node.type);
}

function isOrderedList(opts: TypeOptions, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isOrderedNode(opts, node)
  );
}

function isUnorderedList(opts: TypeOptions, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isUnorderedNode(opts, node)
  );
}

function isCheckList(opts: TypeOptions, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isCheckNode(opts, node)
  );
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
