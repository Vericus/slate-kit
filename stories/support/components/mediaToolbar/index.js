import React from "react";
import { IconButton } from "../toolbar";

class ToolbarButton extends React.Component {
  onMouseDown = e => {
    e.preventDefault();
    this.props.change();
  };
  render() {
    return (
      <button
        style={{
          height: "45px",
          color: this.props.active ? "blue" : "inherit",
          pointerEvents: "auto",
          userSelect: "none"
        }}
        onMouseDown={this.onMouseDown}
      >
        {this.props.children}
      </button>
    );
  }
}

const Toolbar = props => {
  const { editor, node } = props;
  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        background: "rgba(255,255,255,0.8)",
        top: "0",
        pointerEvents: "none"
      }}
    >
      <ToolbarButton
        change={() => editor.changeWidth("fitToText")}
        active={editor.getImageWidth(node) === "fitToText"}
        {...props}
      >
        Fit
      </ToolbarButton>
      <ToolbarButton
        change={() => editor.changeWidth("full")}
        active={editor.getImageWidth(node) === "full"}
        {...props}
      >
        Full
      </ToolbarButton>
      <ToolbarButton
        change={() => editor.changeWidth("original")}
        active={editor.getImageWidth(node) === "original"}
        {...props}
      >
        Original
      </ToolbarButton>
      <ToolbarButton
        change={() => {
          editor.toggleCaption(
            editor.getClosestMedia(editor.value.document, node),
            true
          );
        }}
        active={editor.hasCaption(editor.value.document, node)}
        {...props}
      >
        Cap
      </ToolbarButton>
      <ToolbarButton change={() => editor.deleteMedia()} {...props}>
        Delete
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
