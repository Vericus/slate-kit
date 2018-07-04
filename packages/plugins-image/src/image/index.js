import React from "react";

const buttonStyle = {
  color: "#767676",
  paddingTop: "10rem",
  textAlign: "center"
};

const aStyle = {
  textDecoration: "underline",
  cursor: "pointer"
};

const toolBarStyles = hovering => {
  return {
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    opacity: hovering ? 1 : 0,
    transition: "opacity 0.3s"
  };
};

const imgStyles = ({ loading }) => {
  return {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: loading && 0.5
  };
};

const defaultComponentStyle = {
  backgroundColor: "#f8f8f8",
  height: "25rem"
};

const iconStyles = ({ size }) => {
  return {
    display: "inline-block",
    height: size,
    width: size,
    background: "white",
    border: "1px solid #767676",
    borderRadius: size,
    margin: "0.5rem",
    cursor: "pointer",
    background: "black",
    boxShadow: "0px 0px 5px 0px white",
    color: "white"
  };
};

const DefaultToolbarIcon = props => {
  const size = "2rem";
  return (
    <div onMouseDown={props.action} style={iconStyles({ size })}>
      <div
        style={{
          textAlign: "center",
          lineHeight: size
        }}
      >
        {props.icon}
      </div>
    </div>
  );
};

const defaultToolbar = ({ hovering, loading }, tools) => {
  return (
    <div style={toolBarStyles(hovering)}>
      {hovering &&
        tools.map(
          tool =>
            (tool.always || !loading) && (
              <DefaultToolbarIcon
                name={tool.name}
                action={tool.action}
                icon={tool.icon}
                key={tool.name}
              />
            )
        )}
    </div>
  );
};

const defaultRenderSelect = (chooseFile, handleDeleteImage) => {
  return (
    <div style={buttonStyle}>
      <div>
        <a style={aStyle} onClick={chooseFile}>
          attach an image from your computer
        </a>
      </div>
      <div>
        <a onMouseDown={handleDeleteImage} style={aStyle}>
          cancel
        </a>
      </div>
    </div>
  );
};

class Image extends React.Component {
  state = { loading: true };

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
    this.setState({ errors: "Uploaded file is not an image" });
    return !validImageFormats.includes(file.type);
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

  updateSrc = newUrl => {
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
      uploadImage(file, this.updateSrc);
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
    const { renderSelect, renderErrors } = this.props.options;
    const selectFile = () => {
      this._input.click();
    };
    return (
      <div>
        {(renderSelect && renderSelect(selectFile, this.deleteImage)) ||
          defaultRenderSelect(selectFile, this.deleteImage)}
        {this.state.errors &&
          ((renderErrors && renderErrors(this.state.errors)) ||
            this.renderErrors(this.state.errors))}
      </div>
    );
  };

  renderToolbar = () => {
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
          URL.revokeObjectURL(this.state.src);
          this._input.click();
        },
        icon: "⬆"
      }
    ];
    const { renderToolbar } = this.props.options;
    return (
      <div style={{ position: "absolute", width: "100%", zIndex: 1 }}>
        {(renderToolbar && renderToolbar(this.state, tools)) ||
          defaultToolbar(this.state, tools)}
      </div>
    );
  };

  renderErrors = (error = "There was an error") => {
    return (
      <div style={{ color: "red" }}>
        <p style={{ textDecoration: "none" }}>{error}. Please try again.</p>
      </div>
    );
  };

  renderImage = () => {
    return (
      <img
        style={imgStyles(this.state)}
        onLoad={() => {
          if (!this.state.src.includes("blob")) {
            this.setState({ loading: false });
          }
        }}
        src={this.state.src}
        draggable="false"
      />
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
    const { attributes } = this.props;
    const { src } = this.state;
    return (
      <div
        {...attributes}
        style={this.props.options.style || defaultComponentStyle}
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
      >
        {this.createInput()}
        {!src && this.renderSelect()}
        {src && this.renderToolbar()}
        {src && this.renderImage()}
      </div>
    );
  }
}

export default Image;
