import { Editor, Block } from "slate";
import { TypeOption } from "../options";

export default function deleteMedia(opts: TypeOption) {
  const { mediaTypes } = opts;
  return (editor: Editor) => {
    const media = editor.getSelectedMediaBlock(editor.value);
    if (media && mediaTypes && Block.isBlock(media)) {
      return editor.removeNodeByKey(media.key);
    }
  };
}
