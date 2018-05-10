// @flow
import React, { type Element } from "react";
import { type Node } from "slate";
import Types from "slate-prop-types";

type Props = {
  attributes: any,
  children: Element<*>,
  className: string,
  node: Node
};

export function HeadingOne(props: Props) {
  const { className, attributes, children } = props;
  return (
    <h1 className={className} {...attributes}>
      {children}
    </h1>
  );
}
export function HeadingTwo(props: Props) {
  const { className, attributes, children } = props;
  return (
    <h2 className={className} {...attributes}>
      {children}
    </h2>
  );
}
export function HeadingThree(props: Props) {
  const { className, attributes, children } = props;
  return (
    <h3 className={className} {...attributes}>
      {children}
    </h3>
  );
}
export function HeadingFour(props: Props) {
  const { className, attributes, children } = props;
  return (
    <h4 className={className} {...attributes}>
      {children}
    </h4>
  );
}
export function Paragraph(props: Props) {
  const { className, attributes, children } = props;
  return (
    <p className={className} {...attributes}>
      {children}
    </p>
  );
}

export default function createRenderNode(pluginsWrapper) {
  return (props: Props) => {
    const newProps = pluginsWrapper.getProps(props);
    switch (newProps.node.type) {
      case "heading-one":
        return <HeadingOne {...newProps} />;
      case "heading-two":
        return <HeadingTwo {...newProps} />;
      case "heading-three":
        return <HeadingThree {...newProps} />;
      case "heading-four":
        return <HeadingFour {...newProps} />;
      case "paragraph":
        return <Paragraph {...newProps} />;
      // no default
    }
    return undefined;
  };
}

HeadingOne.propTypes = { ...Types };
HeadingTwo.propTypes = { ...Types };
HeadingThree.propTypes = { ...Types };
HeadingFour.propTypes = { ...Types };
Paragraph.propTypes = { ...Types };
