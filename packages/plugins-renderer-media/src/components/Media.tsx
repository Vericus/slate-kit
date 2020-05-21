import * as React from "react";
import { Block } from "slate";
import { Props } from "../types";

const Media: React.SFC<Props> = (props) => {
  const { node, className, attributes, children, imageType } = props;
  if (node && Block.isBlock(node) && node.nodes) {
    const containImage =
      imageType &&
      node.nodes
        .toArray()
        .find((n) => Block.isBlock(n) && n.type === imageType);
    if (containImage) {
      return (
        <figure className={className} {...attributes}>
          {children}
        </figure>
      );
    }
  }
  return (
    <p className={className} {...attributes}>
      {children}
    </p>
  );
};
export default Media;
