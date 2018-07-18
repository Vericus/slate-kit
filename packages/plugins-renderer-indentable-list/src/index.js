// @flow
import Options, { type typeOptions } from "./options";
import createProps from "./props";
import createDefaultRenderNode, {
  OrderedList,
  UnOrderedList
} from "./renderNode";

function createRenderer(opts: typeOptions, pluginsWrapper: any) {
  const options = new Options(opts);
  const props = createProps(options, pluginsWrapper);
  return {
    renderNode: createDefaultRenderNode(options, pluginsWrapper),
    props
  };
}

export { createRenderer as default, OrderedList, UnOrderedList };
