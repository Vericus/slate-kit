import { Value, Editor } from "slate";
import { TypeOption } from "../options";

export default function getSelectedMediaBlock(opts: TypeOption) {
  const { mediaTypes, type, captionType } = opts;
  const mediaTypesOpts = Object.values(mediaTypes).reduce(
    (types, mediaOption) => [...types, mediaOption.type],
    [captionType]
  );
  return (editor: Editor, value: Value) => {
    const { document } = value;
    const selectedBlocks = editor.getHighestSelectedBlocks(value);
    if (selectedBlocks.size !== 1) return;
    const block = selectedBlocks.get(0);
    if (block && block.type === type) return block;
    if (block && mediaTypesOpts.includes(block.type)) {
      return document.getParent(document.getPath(block.key));
    }
  };
}
