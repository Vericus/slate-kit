import React from "react";
import propTypes from "prop-types";

class DefaultImageRenderer extends React.Component {
  renderToolbar = () => {
    const { isSelected, src, loading, actions } = this.props;
    const { deleteImage, selectFile } = actions;
    return (
      isSelected &&
      src && (
        <div style={{ position: "absolute" }}>
          {!loading && <button onMouseDown={selectFile}>Re-Upload</button>}
          <button onMouseDown={deleteImage}>Delete</button>
        </div>
      )
    );
  };

  renderSelect = () => {
    const { selectFile, deleteImage } = this.props.actions;
    return (
      !this.props.src && (
        <div>
          <button onMouseDown={selectFile}>Select File</button>
          <button onMouseDown={deleteImage}>Delete</button>
        </div>
      )
    );
  };

  renderError = () => {
    const { error } = this.props;
    return (
      <div
        style={{
          backgroundColor: "red",
          color: "white",
          position: "absolute",
          bottom: "0"
        }}
      >
        {error}
      </div>
    );
  };

  renderImage = () =>
    this.props.src && (
      <img
        src={this.props.src}
        style={{ objectFit: "cover", height: "25rem", width: "100%" }}
        alt="main"
      />
    );

  render() {
    return (
      <div
        style={{ height: "25rem", background: "#f7f7f7", position: "relative" }}
      >
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

DefaultImageRenderer.propTypes = {
  actions: propTypes.shape({
    selectFile: propTypes.func.isRequired,
    deleteImage: propTypes.func.isRequired
  }).isRequired,
  isReadOnly: propTypes.bool.isRequired,
  isSelected: propTypes.bool.isRequired,
  src: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired
};

export default DefaultImageRenderer;
