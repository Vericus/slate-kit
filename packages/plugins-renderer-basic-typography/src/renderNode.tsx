import * as React from "react";
import { Node, Editor } from "slate";
import SlateTypes from "slate-prop-types";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  node: Node;
}

export const HeadingOne: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <h1 {...attributes} className={className}>
      {children}
    </h1>
  );
};
export const HeadingTwo: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <h2 {...attributes} className={className}>
      {children}
    </h2>
  );
};
export const HeadingThree: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <h3 {...attributes} className={className}>
      {children}
    </h3>
  );
};
export const HeadingFour: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <h4 {...attributes} className={className}>
      {children}
    </h4>
  );
};
export const Paragraph: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <p {...attributes} className={className}>
      {children}
    </p>
  );
};
export const Blockquote: React.SFC<Props> = props => {
  const { attributes, children, className } = props;
  return (
    <blockquote {...attributes} className={className}>
      {children}
    </blockquote>
  );
};

HeadingOne.propTypes = SlateTypes.Block;
HeadingTwo.propTypes = SlateTypes.Block;
HeadingThree.propTypes = SlateTypes.Block;
HeadingFour.propTypes = SlateTypes.Block;
Paragraph.propTypes = SlateTypes.Block;
Blockquote.propTypes = SlateTypes.Block;

export default function createRenderNode() {
  const nodes = {
    paragraph: Paragraph,
    "heading-one": HeadingOne,
    "heading-two": HeadingTwo,
    "heading-three": HeadingThree,
    "heading-four": HeadingFour,
    blockquote: Blockquote
  };
  return {
    onConstruct: (editor: Editor, next) => {
      if (editor.registerNodeRenderer && editor.getNodeType) {
        const defaultBlock = editor.getNodeType("default");
        if (defaultBlock) {
          editor.registerNodeRenderer("default", nodes[defaultBlock]);
        }
        Object.entries(nodes).map(([type, renderer]) => {
          editor.registerNodeRenderer(editor.getNodeType(type), renderer);
        });
      }
      return next();
    }
  };
}
