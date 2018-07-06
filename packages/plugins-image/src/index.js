// @flow
import InsertImages from "slate-drop-or-paste-images";
import createRenderNode from "./renderer";
import schema from "./schemas";

/**
  Integration with Drap and drop images

const dragDropPlugin = InsertImages({
  extensions: ["png"],
  insertImage: (transform, file) => {
    return transform.insertBlock({
      type: "image",
      isVoid: true,
      data: { file }
    });
  }
});
*/

export default function ImagePlugin(pluginOptions, pluginsWrapper) {
  const renderNode = createRenderNode(pluginOptions, pluginsWrapper);

  return {
    // ...dragDropPlugin,
    schema,
    renderNode
    // onDrop,
    // onPaste
    // onKeyDown // TODO: insert new paragraph when enter.
  };
}
