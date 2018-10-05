import * as React from "react";
import { Node, Block } from "slate";
import { ImageCaption, CaptionPlaceholder, Media, Image } from "./components";

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
  utils,
  captionHideField: string | null
) => {
  const { getSource, hideCaption } = utils;
  const { type } = imageType || { type: undefined };
  return props =>
    hideCaption(props.node) ? null : (
      <ImageCaption {...props} imageType={type} getSource={getSource} />
    );
};

const createCaptionPlaceholder = (
  captionType: string,
  imageType: string | undefined,
  utils
) => {
  const { getSource } = utils;
  return {
    condition: props => {
      if (!imageType) return false;
      if (props.node.type !== captionType) return false;
      const { parent } = props;
      const imageBlock =
        imageType &&
        parent.nodes
          .toArray()
          .find(n => Block.isBlock(n) && n.type === imageType);
      if (imageBlock) {
        const src = getSource(imageBlock);
        return !((src && src === "") || !src) && props.node.text === "";
      }
      return props.node.text === "";
    },
    render: props => <CaptionPlaceholder {...props} />
  };
};

const createImage = (changes, utils, onInsert, extensions) => {
  const { getImageWidth, getSource } = utils;
  const { updateImageSource, toggleCaption } = changes;
  return props => (
    <Image
      {...props}
      extensions={extensions}
      onInsert={onInsert}
      getImageWidth={getImageWidth}
      getSource={getSource}
      updateImageSource={updateImageSource}
      toggleCaption={toggleCaption}
    />
  );
};

export default function createRenderer(opts, changes, utils) {
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
      image: createImage(changes, utils, onInsert, extensions),
      mediacaption: createMediaCaption(image, utils, captionHideField)
    },
    placeholders: [
      createCaptionPlaceholder(captionType, image && image.type, utils)
    ]
  };
}

export { ImageCaption };
