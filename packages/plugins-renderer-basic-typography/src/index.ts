import createRenderNode, {
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  HeadingFour,
  Paragraph,
  Props
} from "./renderNode";

export function createRenderer(opts: any, pluginsWrapper: any) {
  return {
    renderNode: createRenderNode(pluginsWrapper)
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
