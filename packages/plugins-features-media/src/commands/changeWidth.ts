import { Editor, Block } from "slate";
import { TypeOption } from "../options";

export default function changeWidth(opts: TypeOption) {
  const { mediaTypes } = opts;
  return (editor: Editor, width: string) => {
    const media = editor.getSelectedMediaBlock(editor.value);
    if (media && mediaTypes && Block.isBlock(media)) {
      return editor.withoutNormalizing(c => {
        media.nodes.map(node => {
          if (!Block.isBlock(node)) return undefined;
          const { type } = node;
          if (!mediaTypes[type]) return undefined;
          const { defaultWidth, widthOptions, widthField } = mediaTypes[type];
          if (!widthOptions.includes(width) || !defaultWidth || !widthField) {
            return undefined;
          }
          c.setNodeByKey(node.key, {
            data: node.data.set(widthField, width)
          });
          return undefined;
        });
      });
    }
    return (_editor: Editor) => undefined;
  };
}
