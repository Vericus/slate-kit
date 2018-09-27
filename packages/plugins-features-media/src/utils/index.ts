import { Block } from "slate";
import { TypeOption } from "../options";
import getSource from "./getSource";
import getSelectedMediaBlock from "./getSelectedMediaBlock";
import getImageWidth from "./getImageWidth";
import getClosestMedia from "./getClosestMedia";
import getClosestMediaContainer from "./getClosestMediaContainer";

export default function createUtils(opts: TypeOption) {
  const { mediaTypes } = opts;
  const mediaOptions = Object.entries(mediaTypes).reduce(
    (mappings, [mediaKey, mediaOption]) => ({
      ...mappings,
      [mediaOption.type]: mediaOption
    }),
    {}
  );
  return {
    getSelectedMediaBlock: getSelectedMediaBlock(opts),
    getSource: (block: Block) =>
      mediaTypes && mediaTypes.image && getSource(block, mediaTypes.image),
    getImageWidth: (block: Block) =>
      mediaTypes && mediaTypes.image && getImageWidth(block, mediaTypes.image),
    getClosestMedia: getClosestMedia(opts),
    getClosestMediaContainer: getClosestMediaContainer(opts)
  };
}

export {
  getSource,
  getSelectedMediaBlock,
  getImageWidth,
  getClosestMedia,
  getClosestMediaContainer
};
