import React from "react";

const buttonStyle = {
  color: "blue",
  cursor: "pointer",
  margin: "2rem"
};

class Image extends React.Component {
  state = {
    errors: ""
  };

  ///////////////////////// For drag and drop plugin ////////////////////////////
  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get("file");
    if (file) this.load(file);
  }

  load(file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const url = reader.result;
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const src = URL.createObjectURL(blob);
          this.setState({ src });
        });
    });
    if (file) {
      // console.log(file);
      reader.readAsDataURL(file);
    }
  }
  ////////////////////////////////////////////////////////////////////////

  isImageFile = type => {
    const validImageFormats = ["image/gif", "image/jpeg", "image/png"];
    return validImageFormats.includes(type);
  };

  handleInsertImage = (event, input) => {
    const file = event.target.files[0];
    if (this.isImageFile(file.type)) {
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

  componentDidUpdate() {
    console.log(this.props.node);
  }

  deleteImage = e => {
    e.preventDefault();
    e.stopPropagation();

    const { node, readOnly, editor } = this.props;
    const { data } = node;
    if (!readOnly) {
      editor.change(change => {
        change.removeNodeByKey(node.key);
      });
    }
  };

  renderUploadPrompt = () => {
    return (
      <div>
        <a
          style={buttonStyle}
          onClick={() => {
            this._input.click();
          }}
        >
          Upload
        </a>
        <a style={buttonStyle} onMouseDown={this.deleteImage}>
          Cancel
        </a>
        {this.state.errors && this.renderErrors(this.state.errors)}
      </div>
    );
  };

  renderImageTools = () => {
    return (
      <div>
        <a onMouseDown={this.deleteImage} style={buttonStyle}>
          Delete
        </a>
      </div>
    );
  };

  renderErrors = (error = "There was an error") => {
    return (
      <div>
        <p>{error}. Please try again</p>
      </div>
    );
  };

  createInput = () => {
    return (
      <input
        type="file"
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
          backgroundColor: !this.state.src && "#f8f8f8",
          backgroundImage: this.state.src && `url(${this.state.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "25rem"
        }}
      >
        {this.createInput()}
        {!src && this.renderUploadPrompt()}
        {src && this.renderImageTools()}
      </div>
    );
  }
}

export default Image;
