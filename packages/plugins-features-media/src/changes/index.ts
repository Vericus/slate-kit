import { Change } from "slate";
import { TypeOption } from "../options";
import changeWidth from "./changeWidth";

export default function createChanges(opts: TypeOption, utils) {
  return {
    changeWidth: changeWidth(opts, utils)
  };
}
