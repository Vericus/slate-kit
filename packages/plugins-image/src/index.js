import createRenderNode from "./renderer";
import onPaste from "./onPaste";
import schema from "./schemas";

export default function ImagePlugin(pluginOptions, pluginsWrapper) {
  const renderNode = createRenderNode(pluginOptions, pluginsWrapper);
  return {
    schema,
    renderNode,
    onPaste
    // onKeyDown // TODO: insert new paragraph when enter.
  };
}
