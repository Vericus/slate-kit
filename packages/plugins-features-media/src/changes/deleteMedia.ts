import { Change, Block } from "slate";
import { TypeOption } from "../options";

export default function deleteMedia(opts: TypeOption, utils) {
  const { mediaTypes } = opts;
  return (change: Change) => {
    const media = utils.getSelectedMediaBlock(change.value);
    if (media && mediaTypes && Block.isBlock(media)) {
      return change.removeNodeByKey(media.key);
    }
  };
}
