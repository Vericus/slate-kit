// @flow
import createDefaultRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph
} from "./renderNode";

export function createRenderer(opts: typeOptions, pluginsWrapper: any) {
  return {
    renderNode: createDefaultRenderNode(pluginsWrapper)
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
