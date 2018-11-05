import { Change } from "slate";
import { TypeOption } from "../options";
import changeWidth from "./changeWidth";
import toggleCaption from "./toggleCaption";
import deleteMedia from "./deleteMedia";
import insertImage from "./insertImage";
import updateImageSource from "./updateImageSource";

export default function createChanges(opts: TypeOption, pluginsWrapper) {
  return {
    changeWidth: changeWidth(opts),
    toggleCaption: toggleCaption(opts),
    deleteMedia: deleteMedia(opts),
    insertImage: insertImage(opts, pluginsWrapper),
    updateImageSource: updateImageSource(opts)
  };
}
