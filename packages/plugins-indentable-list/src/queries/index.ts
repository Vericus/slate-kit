import { Node, Block, Editor } from "slate";
import { List } from "immutable";
import { TypeOptions, BlockTypes } from "../options";

function selectedOrderedList(editor: Editor, opts: BlockTypes) {
  const { orderedlist } = opts;
  return List(editor.getHighestSelectedBlocks()).filter(
    (node: any) =>
      !!(node && Block.isBlock(node) && node && node.type === orderedlist)
  );
}

function isOrderedNode(editor: Editor, opts: BlockTypes, node: Node) {
  const { orderedlist } = opts;
  return Block.isBlock(node) && node.type === orderedlist;
}

function isUnorderedNode(editor: Editor, opts: BlockTypes, node: Node) {
  const { unorderedlist } = opts;
  return Block.isBlock(node) && node.type === unorderedlist;
}

function isCheckNode(editor: Editor, opts: BlockTypes, node: Node) {
  const { checklist } = opts;
  return Block.isBlock(node) && node.type === checklist;
}

function isListNode(editor: Editor, opts: BlockTypes, node: Node) {
  const { orderedlist, unorderedlist, checklist } = opts;
  const listTypes = [orderedlist, unorderedlist, checklist];
  return Block.isBlock(node) && listTypes.includes(node.type);
}

function isOrderedList(editor: Editor) {
  return List(editor.getHighestSelectedBlocks()).every(
    (node) => Block.isBlock(node) && editor.isOrderedNode(node)
  );
}

function isUnorderedList(editor: Editor) {
  return List(editor.getHighestSelectedBlocks()).every(
    (node) => Block.isBlock(node) && editor.isUnorderedNode(node)
  );
}

function isCheckList(editor: Editor, _opts: BlockTypes) {
  return List(editor.getHighestSelectedBlocks()).every(
    (node) => Block.isBlock(node) && editor.isCheckNode(node)
  );
}

export default function createQueries(opts: TypeOptions) {
  const { blockTypes } = opts;
  return {
    isListNode: (editor: Editor, node: Node) =>
      isListNode(editor, blockTypes, node),
    isOrderedNode: (editor: Editor, node: Node) =>
      isOrderedNode(editor, blockTypes, node),
    isUnorderedNode: (editor: Editor, node: Node) =>
      isUnorderedNode(editor, blockTypes, node),
    isCheckNode: (editor: Editor, node: Node) =>
      isCheckNode(editor, blockTypes, node),
    isOrderedList: (editor: Editor) => isOrderedList(editor),
    isUnorderedList: (editor: Editor) => isUnorderedList(editor),
    isCheckList: (editor: Editor) => isCheckList(editor, blockTypes),
    selectedOrderedList: (editor: Editor) =>
      selectedOrderedList(editor, blockTypes),
  };
}
