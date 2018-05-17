// @flow
import type { Value } from "slate";
import { type typeOptions } from "../options";
import getAlignBlocks from "./getAlignBlocks";

export default function isAlignable(opts: typeOptions, value: Value) {
  return getAlignBlocks(opts, value).length !== 0;
}
