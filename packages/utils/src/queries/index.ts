import getHighestSelectedBlocks from "./getHighestSelectedBlocks";
import hasActiveMark from "./hasActiveMark";
import hasBlock from "./hasBlock";
import hasMark from "./hasMark";

export default function createQueries() {
  return {
    getHighestSelectedBlocks,
    hasActiveMark,
    hasBlock,
    hasMark
  };
}
