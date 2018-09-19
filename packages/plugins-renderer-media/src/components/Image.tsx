import * as React from "react";
import { Block } from "slate";
import { Props as GenericProps } from "../types";

interface States {
  src: string;
  uploading: boolean;
  width: string;
}

interface Props extends GenericProps {
  getSource: (block: Block) => string;
  getImageWidth: (block: Block) => string;
}

export default class Image extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {
      src: Block.isBlock(this.props.node)
        ? this.props.getSource(this.props.node)
        : "",
      width: Block.isBlock(this.props.node)
        ? this.props.getImageWidth(this.props.node)
        : "",
      uploading: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const width = props.getImageWidth(props.node);
    const src = props.getSource(props.node);
    if (width !== state.width || src !== state.src) {
      return {
        ...state,
        width,
        src
      };
    }
    return null;
  }

  render() {
    const { className, attributes, isSelected } = this.props;
    return (
      <img
        className={className}
        src={this.state.src}
        data-image-width={this.state.width}
        data-image-is-selected={isSelected}
        {...attributes}
      />
    );
  }
}
