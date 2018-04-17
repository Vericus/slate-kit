// @flow
import React, { type Element } from "react";
import { type Node } from "slate";
import Types from "slate-prop-types";

type Props = {
  attributes: any,
  children: Element<*>,
  node: Node
};

export function HeadingOne(props: Props) {
  return <h1 {...props.attributes}>{props.children}</h1>;
}
export function HeadingTwo(props: Props) {
  return <h2 {...props.attributes}>{props.children}</h2>;
}
export function HeadingThree(props: Props) {
  return <h3 {...props.attributes}>{props.children}</h3>;
}
export function HeadingFour(props: Props) {
  return <h4 {...props.attributes}>{props.children}</h4>;
}
export function Paragraph(props: Props) {
  return <p {...props.attributes}>{props.children}</p>;
}

function renderNode(props: Props) {
  switch (props.node.type) {
    case "heading-one":
      return <HeadingOne {...props} />;
    case "heading-two":
      return <HeadingTwo {...props} />;
    case "heading-three":
      return <HeadingThree {...props} />;
    case "heading-four":
      return <HeadingFour {...props} />;
    case "paragraph":
      return <Paragraph {...props} />;
    // no default
  }
  return undefined;
}

HeadingOne.propTypes = { ...Types };
HeadingTwo.propTypes = { ...Types };
HeadingThree.propTypes = { ...Types };
HeadingFour.propTypes = { ...Types };
Paragraph.propTypes = { ...Types };
renderNode.propTypes = { ...Types };

export default function createRenderers() {
  return {
    renderNode
  };
}
