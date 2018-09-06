import createRenderMark, { Props } from "./renderMark";

export default function createRenderer(pluginOptions) {
  console.log(pluginOptions);
  return {
    renderMark: createRenderMark()
  };
}
