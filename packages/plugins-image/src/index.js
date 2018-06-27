// @flow
import InsertImages from "slate-drop-or-paste-images";
import renderNode from "./renderer";

export default function createPlugin(pluginOptions: any = {}) {
  let plugins = [
    InsertImages({
      extensions: ["png"],
      insertImage: (transform, file) => {
        console.log(transform, file);
        return transform.insertBlock({
          type: "image",
          isVoid: true,
          data: { file }
        });
      }
    }),
    {
      renderNode
    }
  ];
  return {
    plugins
  };
}
