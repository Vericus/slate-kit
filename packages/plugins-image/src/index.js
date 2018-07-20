import createRenderNode from "./renderer";
import onDropPaste from "./onDropPaste";
import schema from "./schemas";

export default function ImagePlugin(pluginOptions, pluginsWrapper) {
  const renderNode = createRenderNode(pluginOptions, pluginsWrapper);
  return {
    schema,
    renderNode,
    onPaste: onDropPaste,
    onDrop: onDropPaste
    // onKeyDown // TODO: insert new paragraph when enter.
  };
}
