import createRenderNode, {
  OrderedList,
  UnOrderedList,
  Props
} from "./renderNode";

function createRenderer() {
  return {
    renderers: createRenderNode()
  };
}

export { createRenderer as default, OrderedList, UnOrderedList };
