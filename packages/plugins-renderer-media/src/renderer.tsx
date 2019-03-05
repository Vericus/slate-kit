import * as React from "react";
import Register from "@vericus/slate-kit-utils-register-helpers";
import { Node, Block, Editor, Plugin } from "slate";
import Placeholder from "@vericus/slate-kit-utils-placeholders";
import { ImageCaption, Media, Image, CaptionPlaceholder } from "./components";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  node: Node;
}

const createMediaRenderer = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  // eslint-disable-next-line react/display-name
  return props => <Media {...props} imageType={type} />;
};

const createMediaCaption = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  // eslint-disable-next-line react/display-name
  return props =>
    props.editor.hideCaption(props.node) ? null : (
      <ImageCaption {...props} imageType={type} />
    );
};

const createImage = (onInsert, extensions) => {
  // eslint-disable-next-line react/display-name
  return props => (
    <Image {...props} extensions={extensions} onInsert={onInsert} />
  );
};

export default function createRenderer(opts): Plugin[] {
  const { mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  const { onInsert } = image || { onInsert: undefined };
  let extensions;
  if (
    image &&
    image.allowedExtensions &&
    Array.isArray(image.allowedExtensions)
  ) {
    extensions = image.allowedExtensions
      .map(ext => (ext.match(/^\./) ? ext : `.${ext}`))
      .join(", ");
  }
  const nodesRenderer = {
    media: createMediaRenderer(image),
    image: createImage(onInsert, extensions),
    mediacaption: createMediaCaption(image)
  };

  return [
    Register({ nodesRenderer }),
    Placeholder({
      type: "mediaCaption",
      when: (editor: Editor, node: Node) => {
        if (!image || !image.type) return false;
        if (!Block.isBlock(node)) return false;
        return captionType && node.type === captionType && node.text === "";
      },
      // eslint-disable-next-line react/display-name
      render: props => <CaptionPlaceholder {...props} />
    })
  ];
}

export { ImageCaption };
