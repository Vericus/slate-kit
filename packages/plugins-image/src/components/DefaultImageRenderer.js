import React from "react";

import {
  DefaultRenderSelect,
  DefaultRenderToolbar,
  DefaultRenderError
} from "./defaults";

// default
class DefaultImageRenderer extends React.Component {
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

  render() {
    return (
      <div>
        {!this.props.isReadOnly && (
          <div>
            {this.renderToolbar()}
            {this.renderSelect()}
            {this.renderError()}
          </div>
        )}
      </div>
    );
  }
}

export default DefaultImageRenderer;
