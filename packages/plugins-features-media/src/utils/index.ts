import { Block } from "slate";
import { TypeOption } from "../options";
import getSource from "./getSource";
import getSelectedMediaBlock from "./getSelectedMediaBlock";

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
    getSelectedMediaBlock: getSelectedMediaBlock(opts)
  };
}

export { getSource, getSelectedMediaBlock };
