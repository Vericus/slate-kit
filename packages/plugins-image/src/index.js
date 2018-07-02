// @flow
import InsertImages from "slate-drop-or-paste-images";
import renderNode from "./renderer";
import createChanges from "./changes";
import schema from "./schemas";

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

export default function ImagePlugin(pluginOptions: any, pluginsWrapper: any) {
  return {
    // ...dragDropPlugin,
    schema,
    renderNode
    // onDrop,
    // onPaste
    // onKeyDown // insert new paragraph with word and select.
  };
}
