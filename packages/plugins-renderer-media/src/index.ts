import createRenderer from "./renderer";

export function createMediaRenderer(opts, changes, utils) {
  return {
    renderers: createRenderer(opts, changes, utils)
  };
}

export default createMediaRenderer;
