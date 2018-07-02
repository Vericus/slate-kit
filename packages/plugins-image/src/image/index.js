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

const Icon = props => {
  const size = "2rem";
  return (
    <div
      onMouseDown={props.action}
      style={{
        display: "inline-block",
        height: size,
        width: size,
        background: "white",
        border: "1px solid #767676",
        borderRadius: size,
        margin: "0.5rem",
        cursor: "pointer"
      }}
    >
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

class Image extends React.Component {
  state = {};

  componentDidMount() {
    const { src } = this.props.node.data;
    this.setState({ src });
  }

  componentWillUnmount() {
    URL.revokeObjectURL(this.state.src);
  }

  isImageFile = type => {
    const validImageFormats = [
      "image/gif",
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];
    return validImageFormats.includes(type);
  };

  handleInsertImage = (event, input) => {
    const file = event.target.files[0];
    console.log(file.type);

    if (file && this.isImageFile(file.type)) {
      const src = URL.createObjectURL(file);
      this.setState({ src });

      this.props.editor.change(change => {
        change.setNodeByKey(this.props.node.key, { data: { src } });
      });
    } else {
      this.setState({ errors: "Uploaded file is not an image" });
    }

    if (input) {
      input.value = "";
    }
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

  renderUploadPrompt = () => {
    return (
      <div style={buttonStyle}>
        <div>
          <a
            style={aStyle}
            onClick={() => {
              this._input.click();
            }}
          >
            attach an image from your computer
          </a>
        </div>
        <div>
          <a onMouseDown={this.deleteImage} style={aStyle}>
            cancel
          </a>
        </div>
        {this.state.errors && this.renderErrors(this.state.errors)}
      </div>
    );
  };

  renderImageTools = () => {
    const tools = [
      {
        name: "delete",
        action: this.deleteImage,
        icon: "𝗫"
      },
      {
        name: "else",
        action: () => {
          URL.revokeObjectURL(this.state.src);
          this._input.click();
        },
        icon: "⬆"
      }
    ];

    return (
      <div
        onMouseEnter={() => this.setState({ hovering: true })}
        onMouseLeave={() => this.setState({ hovering: false })}
        style={{
          background: this.state.hovering ? "rgba(0,0,0,0.75)" : "transparent",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "3rem"
        }}
      >
        {this.state.hovering &&
          tools.map(tool => (
            <Icon
              name={tool.name}
              action={tool.action}
              icon={tool.icon}
              key={tool.name}
            />
          ))}
      </div>
    );
  };

  renderErrors = (error = "There was an error") => {
    return (
      <div style={{ color: "red" }}>
        <p style={{ textDecoration: "none" }}>{error}. Please try again</p>
      </div>
    );
  };

  renderImage = () => {
    return (
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
        onLoad={() => console.log("Image has loaded")}
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
        style={{
          backgroundColor: "#f8f8f8",
          height: "25rem"
        }}
      >
        {this.createInput()}
        {!src && this.renderUploadPrompt()}
        {src && this.renderImageTools()}
        {src && this.renderImage()}
      </div>
    );
  }
}

export default Image;
