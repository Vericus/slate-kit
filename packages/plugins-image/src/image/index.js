import React from "react";

class Image extends React.Component {
  state = {};

  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get("file");
    // console.log(file);
    if (file) this.load(file);
  }

  componentWillUnmount() {
    console.log("unmounting...");
  }

  load(file) {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      this.setState({ src: reader.result })
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  renderPlaceholder = () => {
    const customStyles = {
      background: "red"
      // height: "25rem"
    };
    return (
      <div style={customStyles}>
        <img />
        <button
          onClick={() => {
            this._input.click();
          }}
        >
          Upload
        </button>
        <button
          onMouseDown={e => {
            e.preventDefault();
            e.stopPropagation();

            const { node, readOnly, editor } = this.props;
            const { data } = node;
            if (!readOnly) {
              editor.change(change => {
                change.removeNodeByKey(node.key);
              });
            }
          }}
        >
          Cancel
        </button>
      </div>
    );
  };

  handleInsertImage = (event, input) => {
    var src = URL.createObjectURL(event.target.files[0]);
    this.setState({ src });
    input.value = "";
  };

  render() {
    const { attributes } = this.props;
    const { src } = this.state;
    return (
      <div {...attributes}>
        {
          // Hidden input component for uploading documents
          <input
            type="file"
            ref={ref => {
              this._input = ref;
            }}
            onChange={e => {
              this.handleInsertImage(e);
            }}
            hidden
          />
        }
        {// Render component, three states, Placeholder, Loading, Image
        src ? (
          <img
            src={src}
            onDrag={() => {
              console.log("dragg");
            }}
          />
        ) : (
          this.renderPlaceholder()
        )}
      </div>
    );
  }
}

export default Image;
