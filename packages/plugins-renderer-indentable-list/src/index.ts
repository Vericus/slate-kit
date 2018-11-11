import createRenderNode, {
  OrderedList,
  UnOrderedList,
  CheckList
} from "./renderNode";

function createRenderer() {
  return {
    renderers: createRenderNode()
  };
}

export { createRenderer as default, OrderedList, UnOrderedList, CheckList };
