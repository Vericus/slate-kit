import React from "react";
import DefaultImageRenderer from "./DefaultImageRenderer";

const bytesToMb = bytes => {
  return (bytes / 1048576).toFixed(1);
};

const resetForm = input => {
  if (input) {
    input.value = "";
  }
};

const imageModeStyles = {
  fit: {},
  cover: {
    backgroundColor: "#f8f8f8",
    height: "25rem"
  },
  original: {}
};

class Image extends React.Component {
  state = { loading: true, src: undefined, error: undefined, mode: "cover" };

  componentDidMount() {
    const src = this.props.node.data.get("src");
    this.setState({ src });
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.src);
  }

  setError = error => {
    this.setState({ error });
  };

  updateSrc = (src = "") => {
    this.setState({ src, loading: false });
    this.props.editor.change(change => {
      change.setNodeByKey(this.props.node.key, { data: { src } });
    });
  };

  invalidImageFile = file => {
    const validImageFormats = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (!validImageFormats.includes(file.type)) {
      this.setError("Uploaded file is not an image");
      return true;
    }
    return false;
  };

  exceedsMaxFileSize = file => {
    const defaultMaxFileSize = 10485760;
    let maxFileSize = this.props.options.maxFileSize || defaultMaxFileSize;
    if (file.size > maxFileSize) {
      this.setError(
        `The file exceeded the maximum size of ${bytesToMb(maxFileSize)} MB`
      );
      return true;
    }
    return false;
  };

  handleInsertImage = (event, input) => {
    const file = event.target.files[0];
    if (!file || this.exceedsMaxFileSize(file) || this.invalidImageFile(file))
      return;

    const src = URL.createObjectURL(file);
    this.setState({ src, loading: true, error: undefined });

    const { uploadImage } = this.props.options;
    if (uploadImage) {
      uploadImage(file, this.updateSrc, this.setError);
    } else {
      this.setState({ loading: false });
    }

    resetForm(input);
  };

  deleteImage = e => {
    e.preventDefault();
    e.stopPropagation();

    const { node, readOnly, editor } = this.props;
    if (!readOnly) {
      editor.change(change => {
        change.removeNodeByKey(node.key);
      });
    }
  };

  selectFile = () => {
    const { src } = this.state;
    if (src) URL.revokeObjectURL(src);
    this._input.click();
  };

  createInput = () => {
    return (
      <input
        type="file"
        accept=".gif, .jpeg, .jpg, .png, image/gif, image/jpeg, image/jpg, image/png"
        ref={ref => (this._input = ref)}
        onChange={e => this.handleInsertImage(e)}
        hidden
      />
    );
  };

  renderImage = () => {
    const { src } = this.state;
    return (
      src && (
        <img
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: this.state.loading && 0.5
          }}
          onLoad={() => {
            if (!src.includes("blob")) {
              this.setState({ loading: false });
            }
          }}
          src={src}
          draggable="false"
        />
      )
    );
  };

  render() {
    const { attributes, readOnly, editor, isSelected, options } = this.props;
    const { src } = this.state;
    const isReadOnly = readOnly || editor.props.isReadOnly;
    const { selectFile, deleteImage } = this;
    let ImageRenderer = options.renderer || DefaultImageRenderer; // TODO: add prop types
    return (
      <div {...attributes} style={imageModeStyles[this.state.mode]}>
        {!isReadOnly && this.createInput()}
        {!isReadOnly && (
          <ImageRenderer
            actions={{ selectFile, deleteImage }}
            isReadOnly={isReadOnly}
            isSelected={isSelected}
            src={this.state.src}
            error={this.state.error}
            loading={this.state.loading}
          />
        )}
        {this.renderImage()}
      </div>
    );
  }
}

export default Image;
