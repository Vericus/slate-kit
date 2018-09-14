import { Value, Block } from "slate";
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { TypeOption } from "../options";

export default function getSelectedMediaBlock(opts: TypeOption) {
  const { mediaTypes, type } = opts;
  const mediaTypesOpts = Object.values(mediaTypes).reduce(
    (types, mediaOption) => [...types, mediaOption.type],
    []
  );
  return (value: Value) => {
    const { document, selection } = value;
    const selectedBlocks = getHighestSelectedBlocks(value);
    if (selectedBlocks.size !== 1) return;
    const block = selectedBlocks.get(0);
    if (block && block.type === type) return block;
    if (block && mediaTypesOpts.includes(block.type)) {
      return document.getParent(document.getPath(block.key));
    }
  };
}
