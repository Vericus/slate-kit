import React from "react";
import Image from "../components/Image";

const createRenderNode = (pluginOptions, pluginsWrapper) => props => {
  const newProps = pluginsWrapper.getProps(props);
  switch (newProps.node.type) {
    case "image":
      return <Image {...newProps} options={pluginOptions} />;
    default:
      return undefined;
  }
};

export default createRenderNode;
