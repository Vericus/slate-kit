import React from "react";
import Image from "../image";

const renderNode = (props: Props) => {
  switch (props.node.type) {
    case "image":
      return <Image {...props} />;
  }
};
export default renderNode;
