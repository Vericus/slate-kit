import Options, { TypeOptions } from "./options";
import createProps from "./props";
import createRenderNode, { OrderedList, UnOrderedList } from "./renderNode";

function createRenderer(opts: TypeOptions, pluginsWrapper: any) {
  const options = new Options(opts);
  return {
    renderNode: createRenderNode(options, pluginsWrapper),
    props: createProps(options, pluginsWrapper)
  };
}

export { createRenderer as default, OrderedList, UnOrderedList };
