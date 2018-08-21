import { Value } from "slate";
import { TypeOptions } from "../options";
import getAlignBlocks from "./getAlignBlocks";
import getAlignment from "./getAlignment";

export default function isAligned(
  opts: TypeOptions,
  value: Value,
  alignment: string
) {
  const alignBlocks = getAlignBlocks(opts, value);
  return (
    alignBlocks.length !== 0 &&
    alignBlocks.every(block => block && getAlignment(opts, block) === alignment)
  );
}
