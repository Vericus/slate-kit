// @flow
import type { typeOptions } from "../options";
import createDefaultRenderNode, {
  OrderedList,
  UnOrderedList
} from "./renderNode";

function createRenderer(opts: typeOptions, pluginsWrapper) {
  const { externalRenderer } = opts;
  return {
    renderNode: externalRenderer
      ? undefined
      : createDefaultRenderNode(opts, pluginsWrapper)
  };
}

export { createRenderer as default, OrderedList, UnOrderedList };
