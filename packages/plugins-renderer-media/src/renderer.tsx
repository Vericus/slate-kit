import * as React from "react";
import { Node } from "slate";

export interface Props {
  attributes: any;
  children: JSX.Element;
  className: string;
  node: Node;
}

const createMediaRenderer = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  return props => {
    if (props.node && props.node.nodes) {
      const containImage =
        type && props.node.nodes.toArray().find(node => node.type === type);
      if (containImage) {
        return (
          <figure className={props.className} {...props.attributes}>
            {props.children}
          </figure>
        );
      }
    }
    return (
      <p className={props.className} {...props.attributes}>
        {props.children}
      </p>
    );
  };
};

export const Image: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return <img className={className} {...props.attributes} />;
};

export const ImageCaption: React.SFC<Props> = props => {
  const { className, attributes, children } = props;
  return (
    <figcaption className={className} {...props.attributes}>
      {children}
    </figcaption>
  );
};

const createMediaCaption = (imageType: any | undefined) => {
  const { type } = imageType || { type: undefined };
  return props => {
    if (props.node && props.node.nodes) {
      const containImage =
        type && props.parent.nodes.toArray().find(node => node.type === type);
      if (containImage) {
        return <ImageCaption {...props} />;
      }
    }
    return (
      <p className={props.className} {...props.attributes}>
        {props.children}
      </p>
    );
  };
};

const createCaptionPlaceholder = (captionType: string) => {
  return {
    condition: props =>
      props.node.type === captionType && props.node.text === "",
    render: props => {
      const { isSelected } = props;
      const innerStyle: React.CSSProperties = {
        position: "absolute",
        whiteSpace: "pre-wrap",
        width: "100%",
        left: 0,
        textIndent: "initial",
        userSelect: "none",
        maxHeight: 180,
        overflow: "hidden"
      };
      return isSelected ? (
        undefined
      ) : (
        <span
          className="innerPlaceholder"
          style={innerStyle}
          data-slate-zero-width
        >
          Add Caption Here
        </span>
      );
    }
  };
};

export default function createRenderer(opts) {
  const { mediaTypes, captionType } = opts;
  const { image } = mediaTypes || { image: undefined };
  return {
    nodes: {
      media: createMediaRenderer(image),
      image: Image,
      mediacaption: createMediaCaption(image)
    },
    placeholders: [createCaptionPlaceholder(captionType)]
  };
}
