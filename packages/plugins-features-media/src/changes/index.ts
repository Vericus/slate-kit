import { Change } from "slate";
import { TypeOption } from "../options";
import changeWidth from "./changeWidth";
import toggleCaption from "./toggleCaption";
import deleteMedia from "./deleteMedia";
import insertImage from "./insertImage";
import updateImageSource from "./updateImageSource";

export default function createChanges(opts: TypeOption, utils, pluginsWrapper) {
  return {
    changeWidth: changeWidth(opts, utils),
    toggleCaption: toggleCaption(opts, utils),
    deleteMedia: deleteMedia(opts, utils),
    insertImage: insertImage(opts, utils, pluginsWrapper),
    updateImageSource: updateImageSource(opts, utils)
  };
}
