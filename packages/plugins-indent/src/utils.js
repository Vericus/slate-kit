// @flow
import { getHighestSelectedBlocks } from "@vericus/slate-kit-plugins-utils";
import { type typeOptions } from "./options";

export default function createUtils(opts: typeOptions) {
  const { indentable, maxIndentation } = opts;
  const isIndentable = block => indentable.includes(block.type);
  const getIndentableBlocks = (value: Value) =>
    getHighestSelectedBlocks(value).filter(block => isIndentable(block));
  const getIndentationLevel = block => block.data.get("indentation") || 0;
  const canBeIndented = value => {
    const indentableBlocks = getIndentableBlocks(value);
    if (indentableBlocks.length === 0) return false;
    return indentableBlocks.some(block => {
      const indentation = getIndentationLevel(block);
      return indentation < maxIndentation;
    });
  };
  const canBeOutdented = value => {
    const indentableBlocks = getIndentableBlocks(value);
    if (indentableBlocks.length === 0) return false;
    return indentableBlocks.some(block => {
      const indentation = getIndentationLevel(block);
      return indentation > 0;
    });
  };
  return {
    getIndentationLevel,
    isIndentable,
    getIndentableBlocks,
    canBeIndented,
    canBeOutdented
  };
}
