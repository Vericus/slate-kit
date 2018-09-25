import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { Value, Node, Block } from "slate";
import { List } from "immutable";
import { TypeOptions, BlockTypes } from "../options";

function selectedOrderedList(opts: BlockTypes, value: Value) {
  const { orderedlist } = opts;
  return List(getHighestSelectedBlocks(value)).filter(
    (node: any) =>
      !!(node && Block.isBlock(node) && node && node.type === orderedlist)
  );
}

function isOrderedNode(opts: BlockTypes, node: Node) {
  const { orderedlist } = opts;
  return Block.isBlock(node) && node.type === orderedlist;
}

function isUnorderedNode(opts: BlockTypes, node: Node) {
  const { unorderedlist } = opts;
  return Block.isBlock(node) && node.type === unorderedlist;
}

function isCheckNode(opts: BlockTypes, node: Node) {
  const { checklist } = opts;
  return Block.isBlock(node) && node.type === checklist;
}

function isListNode(opts: BlockTypes, node: Node) {
  const { orderedlist, unorderedlist, checklist } = opts;
  const listTypes = [orderedlist, unorderedlist, checklist];
  return Block.isBlock(node) && listTypes.includes(node.type);
}

function isOrderedList(opts: BlockTypes, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isOrderedNode(opts, node)
  );
}

function isUnorderedList(opts: BlockTypes, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isUnorderedNode(opts, node)
  );
}

function isCheckList(opts: BlockTypes, value: Value) {
  return List(getHighestSelectedBlocks(value)).every(
    node => Block.isBlock(node) && isCheckNode(opts, node)
  );
}

function createUtils(opts: TypeOptions) {
  const { blockTypes } = opts;
  return {
    isListNode: (node: Node) => isListNode(blockTypes, node),
    isOrderedNode: (node: Node) => isOrderedNode(blockTypes, node),
    isUnorderedNode: (node: Node) => isUnorderedNode(blockTypes, node),
    isCheckNode: (node: Node) => isCheckNode(blockTypes, node),
    isOrderedList: (value: Value) => isOrderedList(blockTypes, value),
    isUnorderedList: (value: Value) => isUnorderedList(blockTypes, value),
    isCheckList: (value: Value) => isCheckList(blockTypes, value),
    selectedOrderedList: (value: Value) =>
      selectedOrderedList(blockTypes, value)
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
