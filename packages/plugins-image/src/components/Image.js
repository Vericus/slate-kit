import React from "react";
import propTypes from "prop-types";
import DefaultImageRenderer from "./DefaultImageRenderer";
import validImageFormats from "../static/validImageFormats";

const bytesToMb = bytes => (bytes / 1048576).toFixed(1);

/* eslint no-param-reassign: ["error", { "props": false }] */
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
    this.attemptBlobUpload();
  }

  componentWillUnmount() {
    // Do not revoke blob on dismount in case of drag and drop
    // URL.revokeObjectURL(this.state.src);
  }

  attemptBlobUpload() {
    const { src } = this.state;
    if (src && src.includes("blob")) {
      fetch(src)
        .then(resp => resp.blob())
        .then(blob => {
          const file = new File([blob], `clipboard.png`);
          this.attemptUpload(file);
        });
    }
  }

  attemptUpload(file) {
    this.setState({ loading: true });
    const { uploadImage } = this.props.options;
    if (uploadImage) {
      uploadImage(file, this.updateSrc, this.updateError);
    } else {
      this.setState({ loading: false });
    }
  }

  updateError = error => {
    this.setState({ error });
  };

  updateSrc = (src = "") => {
    this.setState({ src, loading: false, error: undefined });
    this.props.editor.change(change => {
      change.setNodeByKey(this.props.node.key, { data: { src } });
    });
  };

  updateLoading = state => {
    this.setState({ loading: state });
  };

  invalidImageFile = file => {
    if (!validImageFormats.includes(file.type)) {
      this.updateError("Uploaded file is not an image");
      return true;
    }
    return false;
  };

  exceedsMaxFileSize = file => {
    const defaultMaxFileSize = 10485760;
    const maxFileSize = this.props.options.maxFileSize || defaultMaxFileSize;
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
    this.updateSrc(src);

    this.attemptUpload(file);

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
    this.input.click();
  };

  createInput = () => (
    <input
      type="file"
      accept=".gif, .jpeg, .jpg, .png, image/gif, image/jpeg, image/jpg, image/png"
      ref={ref => {
        this.input = ref;
      }}
      onChange={e => this.handleInsertImage(e, this.input)}
      hidden
    />
  );

  render() {
    const { selectFile, deleteImage, updateLoading, updateError } = this;
    const { attributes, readOnly, editor, isSelected, options } = this.props;
    const { src, loading, error } = this.state;
    const isReadOnly = readOnly || editor.props.isReadOnly;
    const ImageRenderer = options.renderer || DefaultImageRenderer;
    return (
      <div {...attributes}>
        {!isReadOnly && this.createInput()}
        <ImageRenderer
          actions={{ selectFile, deleteImage }}
          isReadOnly={isReadOnly}
          isSelected={isSelected}
          src={src}
          loading={loading}
          error={error}
          updateLoading={updateLoading}
          updateError={updateError}
        />
      </div>
    );
  }
}

Image.propTypes = {
  node: propTypes.shape({
    data: propTypes.isRequired,
    key: propTypes.string.isRequired
  }).isRequired,
  options: propTypes.shape({
    uploadImage: propTypes.func.isRequired,
    maxFileSize: propTypes.number.isRequired
  }).isRequired,
  editor: propTypes.shape({
    change: propTypes.func.isRequired
  }).isRequired,
  attributes: propTypes.isRequired,
  readOnly: propTypes.bool.isRequired,
  isSelected: propTypes.bool.isRequired
};

export default Image;
