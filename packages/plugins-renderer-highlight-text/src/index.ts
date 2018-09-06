import renderMark, { Props } from "./renderMark";

export function createRenderer(opts: any) {
  return {
    renderMark: renderMark(opts)
  };
}

export default createRenderer;
