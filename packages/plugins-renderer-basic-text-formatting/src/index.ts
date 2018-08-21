import createRenderMark from "./renderMark";

export default function createRenderer() {
  return {
    renderMark: createRenderMark()
  };
}
