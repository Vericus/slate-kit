import { Block, Editor } from "slate";
import { ImageOption } from "../options";

export default function getImageSource(
  editor: Editor,
  block: Block,
  imageOption: ImageOption
) {
  const { srcField } = imageOption;
  return srcField ? block.data.get(srcField) : "";
}
