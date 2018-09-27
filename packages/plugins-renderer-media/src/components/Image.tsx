import * as React from "react";
import { Block, Change } from "slate";
import { Props as GenericProps } from "../types";
import ImageUploader from "./ImageUploader";

interface States {
  src: string;
  width: string;
  error?: Error;
}

interface Props extends GenericProps {
  getSource: (block: Block) => string;
  getImageWidth: (block: Block) => string;
  updateImageSource: (change: Change, block: Block, src: string) => any;
  toggleCaption: (change: Change, node?: Block) => any;
  extensions: string;
  onInsert: (...args: any[]) => any;
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
        : ""
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

  onImageSelected = src => {
    const { node, updateImageSource, editor, toggleCaption } = this.props;
    if (Block.isBlock(node)) {
      editor.change(c => {
        updateImageSource(c, node, src);
        toggleCaption(c, node);
      });
    }
  };

  render() {
    const {
      className,
      attributes,
      isSelected,
      extensions,
      onInsert
    } = this.props;
    const { src, width } = this.state;
    if (!src || src === "") {
      return (
        <ImageUploader
          className={className}
          onChange={this.onImageSelected}
          extensions={extensions}
          onInsert={onInsert}
          width={width}
          isSelected={isSelected}
          src={src}
        />
      );
    }
    return (
      <img
        className={className}
        src={src}
        data-image-width={width}
        data-image-is-selected={isSelected}
        {...attributes}
      />
    );
  }
}
