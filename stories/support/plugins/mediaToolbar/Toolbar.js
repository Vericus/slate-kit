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
      <button style={{ height: "45px" }} onMouseDown={this.onMouseDown}>
        {this.props.children}
      </button>
    );
  }
}

const Toolbar = props => {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        height: 0,
        justifyContent: "center"
      }}
    >
      <ToolbarButton
        change={change => props.changes.changeWidth(change, "fitToText")}
        {...props}
      >
        Fit
      </ToolbarButton>
      <ToolbarButton
        change={change => props.changes.changeWidth(change, "full")}
        {...props}
      >
        Full
      </ToolbarButton>
      <ToolbarButton
        change={change => props.changes.changeWidth(change, "original")}
        {...props}
      >
        Original
      </ToolbarButton>
      <ToolbarButton
        change={change => props.changes.toggleCaption(change)}
        {...props}
      >
        Cap
      </ToolbarButton>
      <ToolbarButton
        change={change => props.changes.deleteMedia(change)}
        {...props}
      >
        Delete
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
