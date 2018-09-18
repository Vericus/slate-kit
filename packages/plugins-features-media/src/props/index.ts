import { TypeOption, ImageOption } from "../options";
import getImageSource from "../utils/getSource";
import getImageWidth from "../utils/getImageWidth";

const getMediaProps = props => props;

const getCaptionProps = props => props;

const getImageProps = (props, imageOption: ImageOption) => {
  let newProps = props;
  const width = getImageWidth(props.node, imageOption);
  const src = getImageSource(props.node, imageOption);
  newProps = {
    ...newProps,
    attributes: {
      ...newProps.attributes,
      ["data-image-is-selected"]: props.isSelected,
      ["data-image-width"]: width,
      src
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
