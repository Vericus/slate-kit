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
}

export default class ImageUploader extends React.Component<
  UploaderProps,
  UploaderStates
> {
  public constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.state = {
      src: this.props.src
    };
  }

  private onImageUploaded = (src: string) => {
    this.setState({
      src
    });
    this.props.onChange(src);
  };

  private handleImageRead = _e => {
    const src = this.fileReader.result as string;
    if (src && src !== "") {
      this.setState(
        {
          src
        },
        () => {
          this.props.onInsert(src).then(this.onImageUploaded);
        }
      );
    }
  };

  private onImageSelected = file => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleImageRead;
    this.fileReader.readAsDataURL(file);
  };

  private onImageSelect = e => {
    e.preventDefault();
    e.stopPropagation();
    const fileInput = this.fileRef.current;
    if (fileInput) {
      fileInput.click();
    }
  };

  private onImageChange = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target && e.target.files) {
      this.onImageSelected(e.target.files[0]);
    }
  };

  private fileRef: React.RefObject<HTMLInputElement>;

  private fileReader: FileReader;

  public render() {
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
        alt={this.state.src}
      />
    );
  }
}
