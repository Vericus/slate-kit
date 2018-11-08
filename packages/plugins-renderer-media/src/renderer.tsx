import * as React from "react";
import { Node, Block } from "slate";
import { ImageCaption, Media, Image } from "./components";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  node: Node;
}

const createMediaRenderer = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  return props => <Media {...props} imageType={type} />;
};

const createMediaCaption = (
  imageType: any | undefined,
  captionHideField: string | null
) => {
  const { type } = imageType || { type: undefined };
  return props =>
    props.editor.hideCaption(props.node) ? null : (
      <ImageCaption {...props} imageType={type} />
    );
};

const createImage = (onInsert, extensions) => {
  return props => (
    <Image {...props} extensions={extensions} onInsert={onInsert} />
  );
};

export default function createRenderer(opts) {
  const { mediaTypes, captionType, captionHideField } = opts;
  const { image } = mediaTypes || { image: undefined };
  let onInsert;
  let extensions;
  if (image && image.onInsert) {
    onInsert = image.onInsert;
  }
  if (
    image &&
    image.allowedExtensions &&
    Array.isArray(image.allowedExtensions)
  ) {
    extensions = image.allowedExtensions
      .map(ext => (ext.match(/^\./) ? ext : `.${ext}`))
      .join(", ");
  }
  return {
    nodes: {
      media: createMediaRenderer(image),
      image: createImage(onInsert, extensions),
      mediacaption: createMediaCaption(image, captionHideField)
    }
  };
}

export { ImageCaption };
