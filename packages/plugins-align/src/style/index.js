// @flow
import { type typeOptions } from "../options";
import getData from "./getData";

export default function createStyle(opts: typeOptions) {
  const { floatBlocks, textBlocks, dataField, alignments } = opts;
  return { getData: el => getData(el, dataField) };
}
