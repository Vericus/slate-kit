// @flow
import getAlignBlocks from "./getAlignBlocks";
import getAlignment from "./getAlignment";

export default function isAligned(opts, value, alignment) {
  return getAlignBlocks(opts, value).every(
    block => block && getAlignment(opts, block) === alignment
  );
}
