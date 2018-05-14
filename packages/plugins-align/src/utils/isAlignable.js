// @flow
import getAlignBlocks from "./getAlignBlocks";

export default function isAlignable(opts, value) {
  return getAlignBlocks(opts, value).length !== 0;
}
