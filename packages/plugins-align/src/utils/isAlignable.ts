import { Value } from "slate";
import { TypeOptions } from "../options";
import getAlignBlocks from "./getAlignBlocks";

export default function isAlignable(opts: TypeOptions, value: Value) {
  return getAlignBlocks(opts, value).length !== 0;
}
