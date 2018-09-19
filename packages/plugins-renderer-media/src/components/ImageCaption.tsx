import * as React from "react";
import { Block } from "slate";
import { Props } from "../types";

const ImageCaption: React.SFC<Props> = props => {
  const { className, attributes, children, imageType, node, parent } = props;
  if (node && Block.isBlock(node) && node.nodes && Block.isBlock(parent)) {
    const containImage =
      imageType &&
      parent.nodes
        .toArray()
        .find(n => Block.isBlock(n) && n.type === imageType);
    if (containImage) {
      return (
        <figcaption className={className} {...attributes}>
          {children}
        </figcaption>
      );
    }
  }
  return (
    <p className={className} {...attributes}>
      {children}
    </p>
  );
};

export default ImageCaption;
