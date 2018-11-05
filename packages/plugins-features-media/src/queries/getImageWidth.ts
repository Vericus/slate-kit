import { Block, Editor } from "slate";
import { ImageOption } from "../options";
const getImageWidth = (
  editor: Editor,
  block: Block,
  imageOption: ImageOption
) => {
  const { widthOptions, defaultWidth, widthField } = imageOption;
  const width = (block.data && block.data.get(widthField)) || defaultWidth;
  return width || "";
};
export default getImageWidth;
