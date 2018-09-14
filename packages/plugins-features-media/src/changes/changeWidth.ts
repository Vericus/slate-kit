import { Change, Block } from "slate";
import { TypeOption } from "../options";

export default function changeWidth(opts: TypeOption, utils) {
  const { mediaTypes } = opts;
  return (change: Change, width: string) => {
    const media = utils.getSelectedMedia(change.value);
    if (media && mediaTypes && Block.isBlock(media)) {
      return change.withoutNormalization(c => {
        media.nodes.map(node => {
          if (!Block.isBlock(node)) return;
          const { type } = node;
          if (!mediaTypes[type]) return;
          const { defaultWidth, widthOptions, widthField } = mediaTypes[type];
          if (!widthOptions.includes(width) || !defaultWidth || !widthField) {
            return;
          }
          c.setNodeByKey(node.key, {
            data: node.data.set(widthField, width)
          });
        });
      });
    }
  };
}
