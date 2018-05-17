// @flow
import type { typeOptions } from "../options";
import createDefaultRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph
} from "./renderNode";

export function createRenderer(opts: typeOptions, pluginsWrapper: any) {
  const { externalRenderer } = opts;
  return {
    renderNode: externalRenderer
      ? undefined
      : createDefaultRenderNode(pluginsWrapper)
  };
}

export {
  createRenderer as default,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph
};
