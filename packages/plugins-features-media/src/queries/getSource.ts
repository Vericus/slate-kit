import { ImageOption } from "../options";
import { Block, Editor } from "slate";
export default function getImageSource(
  editor: Editor,
  block: Block,
  imageOption: ImageOption
) {
  const { srcField } = imageOption;
  return srcField ? block.data.get(srcField) : "";
}
