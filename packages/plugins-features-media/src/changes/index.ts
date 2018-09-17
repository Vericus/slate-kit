import { Change } from "slate";
import { TypeOption } from "../options";
import changeWidth from "./changeWidth";
import toggleCaption from "./toggleCaption";
import deleteMedia from "./deleteMedia";

export default function createChanges(opts: TypeOption, utils) {
  return {
    changeWidth: changeWidth(opts, utils),
    toggleCaption: toggleCaption(opts, utils),
    deleteMedia: deleteMedia(opts, utils)
  };
}
