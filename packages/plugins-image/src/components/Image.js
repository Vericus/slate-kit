import React from "react";

import {
  defaultComponentStyle,
  DefaultRenderSelect,
  DefaultRenderToolbar,
  DefaultRenderError
} from "./defaults";

class Image extends React.Component {
  state = { loading: true, src: undefined, errors: undefined };

  componentDidMount() {
    const { src } = this.props.node.data;
    this.setState({ src });
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.src);
  }

  invalidImageFile = file => {
    const validImageFormats = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    if (validImageFormats.includes(file.type)) {
      return false;
    } else {
      this.setState({ errors: "Uploaded file is not an image" });
      return true;
    }
  };

  exceedsMaxFileSize = file => {
    const defaultMaxFileSize = 10485760;
    let maxFileSize = this.props.options.maxFileSize || defaultMaxFileSize;
    if (file.size > maxFileSize) {
      this.setState({
        errors: `The file exceeded the maximum size of ${(
          maxFileSize / 1048576
        ).toFixed(1)} MB`
      });
      return true;
    }
    return false;
  };

  resetForm = input => {
    if (input) {
      input.value = "";
    }
  };

  updateSrc = (newUrl = "") => {
    this.setState({ src: newUrl, loading: false });
    this.props.editor.change(change => {
      change.setNodeByKey(this.props.node.key, { data: { newUrl } });
    });
  };

  handleInsertImage = (event, input) => {
    const file = event.target.files[0];

    if (!file) return;
    if (this.exceedsMaxFileSize(file)) return;
    if (this.invalidImageFile(file)) return;

    const tempSrc = URL.createObjectURL(file);
    this.setState({ src: tempSrc, loading: true });

    const { uploadImage } = this.props.options;
    if (uploadImage) {
      uploadImage(file, this.updateSrc, errors => {
        this.setState({ errors });
      });
    } else {
      this.setState({ loading: false });
    }

    this.resetForm(input);
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

  renderSelect = () => {
    const { renderSelect, renderError } = this.props.options;
    const selectFile = () => {
      this._input.click();
    };
    return (
      !this.state.src && (
        <div>
          {(renderSelect && renderSelect(selectFile, this.deleteImage)) ||
            DefaultRenderSelect(selectFile, this.deleteImage)}
          {this.state.errors &&
            ((renderError && renderError(this.state.errors)) ||
              DefaultRenderError(this.state.errors))}
        </div>
      )
    );
  };

  renderToolbar = () => {
    const { src, hovering, loading } = this.state;
    const tools = [
      {
        name: "delete",
        action: this.deleteImage,
        icon: "𝗫",
        always: true
      },
      {
        name: "re-upload",
        action: () => {
          URL.revokeObjectURL(src);
          this._input.click();
        },
        icon: "⬆"
      }
    ];
    const { renderToolbar } = this.props.options;
    return (
      src && (
        <div style={{ position: "absolute", width: "100%", zIndex: 1 }}>
          {(renderToolbar && renderToolbar({ hovering, loading }, tools)) ||
            DefaultRenderToolbar({ hovering, loading }, tools)}
        </div>
      )
    );
  };

  renderImage = () => {
    const { src } = this.state;
    return (
      src && (
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: this.state.loading && 0.5
          }}
          onLoad={() => {
            if (!this.state.src.includes("blob")) {
              this.setState({ loading: false });
            }
          }}
          src={src}
          draggable="false"
        />
      )
    );
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
    const { attributes, readOnly, editor } = this.props;
    const { src } = this.state;
    const isReadOnly = readOnly || editor.props.isReadOnly;
    return (
      <div
        {...attributes}
        style={this.props.options.style || defaultComponentStyle}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
        {!isReadOnly && (
          <div>
            {this.createInput()}
            {this.renderSelect()}
            {this.renderToolbar()}
          </div>
        )}
        {this.renderImage()}
      </div>
    );
  }
}

export default Image;
