import { Block, Editor } from "slate";
import { TypeOption } from "../options";
import getSource from "./getSource";
import getSelectedMediaBlock from "./getSelectedMediaBlock";
import getImageWidth from "./getImageWidth";
import getClosestMedia from "./getClosestMedia";
import getClosestMediaContainer from "./getClosestMediaContainer";
import hasCaption from "./hasCaption";
import hideCaption from "./hideCaption";

export default function createQueries(opts: TypeOption) {
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
    getSource: (editor: Editor, block: Block) =>
      mediaTypes &&
      mediaTypes.image &&
      getSource(editor, block, mediaTypes.image),
    getImageWidth: (editor: Editor, block: Block) =>
      mediaTypes &&
      mediaTypes.image &&
      getImageWidth(editor, block, mediaTypes.image),
    getClosestMedia: getClosestMedia(opts),
    getClosestMediaContainer: getClosestMediaContainer(opts),
    hasCaption: hasCaption(opts),
    hideCaption: hideCaption(opts)
  };
}

export {
  getSource,
  getSelectedMediaBlock,
  getImageWidth,
  getClosestMedia,
  getClosestMediaContainer,
  hideCaption
};
