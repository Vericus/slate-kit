import React from "react";

import {
  DefaultRenderSelect,
  DefaultRenderToolbar,
  DefaultRenderError
} from "./imageRendererHelper.js";

class CustomImageRenderer extends React.Component {
  renderSelect = () => {
    const { actions } = this.props;
    const { selectFile, deleteImage } = actions;
    return (
      !this.props.src && (
        <div>{DefaultRenderSelect(selectFile, deleteImage)}</div>
      )
    );
  };

  renderError = () => {
    return (
      <div style={{ position: "absolute", width: "100%" }}>
        {this.props.error && DefaultRenderError(this.props.error)}
      </div>
    );
  };

  renderToolbar = () => {
    const { src, loading, actions } = this.props;
    const { selectFile, deleteImage } = actions;
    const selected = this.props.isSelected;
    const tools = [
      {
        name: "delete",
        action: deleteImage,
        always: true
      },
      {
        name: "re-upload",
        action: selectFile
      }
    ];
    return (
      src && (
        <div style={{ position: "absolute", width: "100%", zIndex: 1 }}>
          {DefaultRenderToolbar({ selected, loading }, tools)}
        </div>
      )
    );
  };

  renderImage = () => {
    const { src, updateLoading } = this.props;
    return (
      src && (
        <img
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: this.props.loading && 0.5
          }}
          onLoad={() => {
            if (!src.includes("blob")) {
              updateLoading(false);
            }
          }}
          src={src}
        />
      )
    );
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f8f8f8", height: "25rem" }}>
        {!this.props.isReadOnly && (
          <div>
            {this.renderToolbar()}
            {this.renderSelect()}
            {this.renderError()}
          </div>
        )}
        {this.renderImage()}
      </div>
    );
  }
}

export default CustomImageRenderer;
