import { TypeOption, ImageOption } from "../options";
import getImageSource from "../utils/getSource";
import getImageWidth from "../utils/getImageWidth";

const getMediaProps = props => props;

const getCaptionProps = props => {
  let newProps = props;
  newProps = {
    ...newProps,
    attributes: {
      ...newProps.attributes,
      style:
        newProps.attributes && newProps.attributes.style
          ? {
              ...newProps.attributes.style,
              "text-align": "center"
            }
          : {
              "text-align": "center"
            }
    }
  };
  return newProps;
};

const getImageProps = (props, imageOption: ImageOption) => {
  let newProps = props;
  const width = getImageWidth(props.node, imageOption);
  const src = getImageSource(props.node, imageOption);
  let imageStyle: any = {
    display: "block",
    verticalAlign: "middle",
    boxSizing: "border-box",
    minWidth: "360px",
    marginLeft: "auto",
    marginRight: "auto"
  };
  if (props.isSelected) {
    imageStyle = {
      ...imageStyle,
      outline: "1px solid blue"
    };
  }
  if (width === "full") {
    imageStyle = {
      ...imageStyle,
      width: "100%",
      maxWidth: "100%",
      objectFit: "cover",
      maxHeight: "80vh"
    };
  } else if (width === "original") {
    imageStyle = {
      ...imageStyle,
      width: "auto",
      maxWidth: "100%",
      objectFit: "contain"
    };
  } else {
    imageStyle = {
      ...imageStyle,
      width: "100%",
      maxWidth: "800px",
      objectFit: "contain"
    };
  }
  newProps = {
    ...newProps,
    attributes: {
      ...newProps.attributes,
      src,
      style:
        newProps.attributes && newProps.attributes.style
          ? {
              ...newProps.attributes.style,
              ...imageStyle
            }
          : imageStyle
    }
  };
  return newProps;
};

export default function createProps(opts: TypeOption) {
  const { mediaTypes, type, captionType } = opts;
  const types = [
    type,
    captionType,
    ...Object.values(mediaTypes).map(mediaType => mediaType.type)
  ];
  const imageType = mediaTypes.image ? mediaTypes.image.type : undefined;
  return {
    getProps: props => {
      const nodeType = props.node.type;
      if (!types.includes(nodeType)) return props;
      if (type && nodeType === type) {
        return getMediaProps(props);
      } else if (captionType && nodeType === captionType) {
        return getCaptionProps(props);
      } else if (imageType && mediaTypes.image && nodeType === imageType) {
        return getImageProps(props, mediaTypes.image);
      }
      return props;
    }
  };
}
