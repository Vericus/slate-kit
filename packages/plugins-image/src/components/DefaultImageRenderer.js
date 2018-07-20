import React from "react";
import propTypes from "prop-types";

const buttonStyle = {
  background: "transparent",
  border: "0",
  color: "#767676",
  cursor: "pointer",
  textDecoration: "underline"
};

class DefaultImageRenderer extends React.Component {
  renderToolbar = () => {
    const { isSelected, src, loading, actions } = this.props;
    const { deleteImage, selectFile } = actions;
    const style = {
      position: "absolute",
      zIndex: 1,
      background: "linear-gradient(rgba(0, 0, 0, 0.66), transparent)",
      width: "100%",
      height: "4rem",
      opacity: isSelected ? 1 : 0,
      transition: "opacity 0.3s",
      textAlign: "center"
    };
    const toolStyle = {
      color: "white",
      margin: "1rem"
    };
    return (
      src && (
        <div style={style}>
          {isSelected && (
            <div>
              {!loading && (
                <button
                  style={{ ...buttonStyle, ...toolStyle }}
                  onMouseDown={selectFile}
                >
                  Re-Upload
                </button>
              )}
              <button
                style={{ ...buttonStyle, ...toolStyle }}
                onMouseDown={deleteImage}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )
    );
  };

  renderSelect = () => {
    const { selectFile, deleteImage } = this.props.actions;
    const style = { paddingTop: "10rem", textAlign: "center" };
    return (
      !this.props.src && (
        <div style={style}>
          <div>
            <button style={buttonStyle} onClick={selectFile}>
              attach an image from your computer
            </button>
          </div>
          <div>
            <button style={buttonStyle} onClick={deleteImage}>
              cancel
            </button>
          </div>
        </div>
      )
    );
  };

  renderError = () => {
    const { error } = this.props;
    const style = {
      background: "rgba(0, 0, 0, 0.66)",
      color: "white",
      position: "absolute",
      bottom: "0",
      width: "100%",
      textAlign: "center"
    };
    return (
      error && (
        <div style={style}>
          <p>Error: {error}</p>
        </div>
      )
    );
  };

  renderImage = () =>
    this.props.src && (
      <img
        src={this.props.src}
        style={{
          objectFit: "cover",
          height: "25rem",
          width: "100%",
          opacity: this.props.loading ? 0.25 : 1
        }}
        onLoad={this.props.onImgLoad}
        alt="main"
        draggable="false"
      />
    );

  renderLoading = () =>
    this.props.loading &&
    this.props.src && (
      <div
        style={{
          position: "absolute",
          bottom: "50%",
          width: "100%",
          textAlign: "center"
        }}
      >
        <p>Loading</p>
      </div>
    );

  render() {
    return (
      <div
        style={{ height: "25rem", background: "#f7f7f7", position: "relative" }}
      >
        {!this.props.isReadOnly && [
          this.renderToolbar(),
          this.renderSelect(),
          this.renderError()
        ]}
        {this.renderImage()}
        {this.renderLoading()}
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
  error: propTypes.string.isRequired,
  loading: propTypes.bool.isRequired,
  onImgLoad: propTypes.func.isRequired
};

export default DefaultImageRenderer;
