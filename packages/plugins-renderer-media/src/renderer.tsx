import * as React from "react";
import { Node } from "slate";
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

const createMediaCaption = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  return props => <ImageCaption {...props} imageType={type} />;
};

const createCaptionPlaceholder = (captionType: string) => ({
  condition: props => props.node.type === captionType && props.node.text === "",
  render: props => <CaptionPlaceholder {...props} />
});

const createImage = (changes, utils) => {
  const { getImageWidth, getSource } = utils;
  const { updateImageSource } = changes;
  return props => (
    <Image
      {...props}
      getImageWidth={getImageWidth}
      getSource={getSource}
      updateImageSource={updateImageSource}
    />
  );
};

export default function createRenderer(opts, changes, utils) {
  const { mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  return {
    nodes: {
      media: createMediaRenderer(image),
      image: createImage(changes, utils),
      mediacaption: createMediaCaption(image)
    },
    placeholders: [createCaptionPlaceholder(captionType)]
  };
}

export { ImageCaption };
