// @flow
import createRenderNode from "./renderer";
import schema from "./schemas";

export default function ImagePlugin(pluginOptions, pluginsWrapper) {
  const renderNode = createRenderNode(pluginOptions, pluginsWrapper);

  return {
    schema,
    renderNode,
    onPaste: (event, change) => {
      // TODO: verify clipboard type == image, allow file paste
      const { items } = event.clipboardData;
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const blobUrl = URL.createObjectURL(item.getAsFile());
        change.insertBlock({
          type: "image",
          isVoid: true,
          data: { src: blobUrl }
        });
      }
    }
    // onKeyDown // TODO: insert new paragraph when enter.
  };
}
