import { ImageOption } from "../options";
import { Block } from "slate";
export default function getImageSource(block: Block, imageOption: ImageOption) {
  const { srcField } = imageOption;
  return block.data.get(srcField) || "";
}
