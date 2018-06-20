// @flow
import Options, { type typeOptions } from "./options";
import createDefaultRenderNode, {
  OrderedList,
  UnOrderedList
} from "./renderNode";

function createRenderer(opts: typeOptions, pluginsWrapper: any) {
  const options = new Options(opts);
  return {
    renderNode: createDefaultRenderNode(options, pluginsWrapper)
  };
}

export { createRenderer as default, OrderedList, UnOrderedList };
