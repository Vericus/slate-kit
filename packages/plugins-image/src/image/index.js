import React from "react";

class Image extends React.Component {
  state = {};

  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get("file");
    // console.log(file);
    this.load(file);
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
    };
    return (
      <div
        style={customStyles}
        onClick={() => {
          this._input.click();
        }}
      >
        {this.state.src ? this.state.src : "This is a placeholder"}
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
      <div>
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
        {// Render component
        src ? (
          <img
            {...attributes}
            src={src}
            onDrop={e => {
              console.log("Drop");
              e.preventDefault();
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
