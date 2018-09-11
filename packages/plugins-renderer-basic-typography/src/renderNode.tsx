import * as React from "react";
import { Node } from "slate";
import SlateTypes from "slate-prop-types";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  node: Node;
}

export const HeadingOne: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <h1 className={className} {...attributes}>
      {children}
    </h1>
  );
};
export const HeadingTwo: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <h2 className={className} {...attributes}>
      {children}
    </h2>
  );
};
export const HeadingThree: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <h3 className={className} {...attributes}>
      {children}
    </h3>
  );
};
export const HeadingFour: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <h4 className={className} {...attributes}>
      {children}
    </h4>
  );
};
export const Paragraph: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <p className={className} {...attributes}>
      {children}
    </p>
  );
};
export const Blockquote: React.SFC<Props> = props => {
  const { attributes, children } = props;
  return <blockquote {...attributes}>{children}</blockquote>;
};

HeadingOne.propTypes = SlateTypes.Block;
HeadingTwo.propTypes = SlateTypes.Block;
HeadingThree.propTypes = SlateTypes.Block;
HeadingFour.propTypes = SlateTypes.Block;
Paragraph.propTypes = SlateTypes.Block;
Blockquote.propTypes = SlateTypes.Block;

export default function createRenderNode() {
  return {
    nodes: {
      paragraph: Paragraph,
      "heading-one": HeadingOne,
      "heading-two": HeadingTwo,
      "heading-three": HeadingThree,
      "heading-four": HeadingFour,
      blockquote: Blockquote
    }
  };
}
