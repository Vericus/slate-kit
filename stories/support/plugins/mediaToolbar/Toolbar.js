import React from "react";
import { IconButton } from "../../components/toolbar";

class ToolbarButton extends React.Component {
  onMouseDown = e => {
    e.preventDefault();
    this.props.editor.change(change => {
      this.props.change(change);
    });
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
  const { changes, editor, node, utils } = props;
  const { changeWidth, toggleCaption, deleteMedia } = changes;
  const { hasCaption, getClosestMedia, getImageWidth } = utils;
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
        change={change => changeWidth(change, "fitToText")}
        active={getImageWidth(node) === "fitToText"}
        {...props}
      >
        Fit
      </ToolbarButton>
      <ToolbarButton
        change={change => changeWidth(change, "full")}
        active={getImageWidth(node) === "full"}
        {...props}
      >
        Full
      </ToolbarButton>
      <ToolbarButton
        change={change => changeWidth(change, "original")}
        active={getImageWidth(node) === "original"}
        {...props}
      >
        Original
      </ToolbarButton>
      <ToolbarButton
        change={change => {
          toggleCaption(
            change,
            getClosestMedia(change.value.document, node),
            true
          );
        }}
        active={hasCaption(editor.value.document, node)}
        {...props}
      >
        Cap
      </ToolbarButton>
      <ToolbarButton change={change => deleteMedia(change)} {...props}>
        Delete
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
