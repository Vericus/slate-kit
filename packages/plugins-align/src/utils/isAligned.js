// @flow
import type { Value } from "slate";
import { type typeOptions } from "../options";
import getAlignBlocks from "./getAlignBlocks";
import getAlignment from "./getAlignment";

export default function isAligned(
  opts: typeOptions,
  value: Value,
  alignment: string
) {
  return getAlignBlocks(opts, value).every(
    block => block && getAlignment(opts, block) === alignment
  );
}
