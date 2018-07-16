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

class Image extends React.Component {
  constructor(props) {
    super(props);
    const src = props.node.data.get("src");
    this.state = { src, loading: false, error: undefined };
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.src);
  }

  updateError = error => {
    this.setState({ error });
  };

  updateSrc = (src = "") => {
    this.setState({ src, loading: false });
    this.props.editor.change(change => {
      change.setNodeByKey(this.props.node.key, { data: { src } });
    });
  };

  updateLoading = state => {
    this.setState({ loading: state });
  };

  invalidImageFile = file => {
    const validImageFormats = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (!validImageFormats.includes(file.type)) {
      this.updateError("Uploaded file is not an image");
      return true;
    }
    return false;
  };

  exceedsMaxFileSize = file => {
    const defaultMaxFileSize = 10485760;
    let maxFileSize = this.props.options.maxFileSize || defaultMaxFileSize;
    if (file.size > maxFileSize) {
      this.updateError(
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
      uploadImage(file, this.updateSrc, this.updateError);
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

  render() {
    const { selectFile, deleteImage } = this;
    const { attributes, readOnly, editor, isSelected, options } = this.props;
    const { src } = this.state;
    const isReadOnly = readOnly || editor.props.isReadOnly;
    const ImageRenderer = options.renderer || DefaultImageRenderer;
    return (
      <div {...attributes}>
        {!isReadOnly && this.createInput()}
        <ImageRenderer
          actions={{ selectFile, deleteImage }}
          isReadOnly={isReadOnly}
          isSelected={isSelected}
          src={this.state.src}
          loading={this.state.loading}
          error={this.state.error}
          updateLoading={this.updateLoading}
          updateError={this.updateError}
        />
      </div>
    );
  }
}

export default Image;
