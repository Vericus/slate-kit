import * as React from "react";

interface UploaderProps {
  className: string;
  src: string;
  width: string;
  isSelected: boolean | undefined;
  onChange: (src: string) => any;
  extensions: string;
  onInsert: (...args: any[]) => any;
}

interface UploaderStates {
  src: string;
  uploading: boolean;
}

export default class ImageUploader extends React.Component<
  UploaderProps,
  UploaderStates
> {
  fileRef: React.RefObject<HTMLInputElement>;
  fileReader: FileReader;
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.state = {
      src: this.props.src,
      uploading: false
    };
  }

  onImageUploaded = (src: string) => {
    this.setState({
      src,
      uploading: false
    });
    this.props.onChange(src);
  };

  handleImageRead = e => {
    const src = this.fileReader.result as string;
    if (src && src !== "") {
      this.setState(
        {
          src,
          uploading: true
        },
        () => {
          this.props.onInsert(src).then(this.onImageUploaded);
        }
      );
    }
  };
  onImageSelected = file => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleImageRead;
    this.fileReader.readAsDataURL(file);
  };
  onImageSelect = e => {
    e.preventDefault();
    e.stopPropagation();
    const fileInput = this.fileRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };
  onImageChange = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target && e.target.files) {
      this.onImageSelected(e.target.files[0]);
    }
  };
  render() {
    if (!this.state.src || this.state.src === "") {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onMouseDown={this.onImageSelect}>select image</button>
          <input
            ref={this.fileRef}
            type="file"
            multiple={false}
            accept={this.props.extensions}
            style={{ display: "none" }}
            onChange={this.onImageChange}
            capture
          />
        </div>
      );
    }
    return (
      <img
        data-image-width={this.props.width}
        data-image-is-selected={this.props.isSelected}
        src={this.state.src}
        className={this.props.className}
      />
    );
  }
}
