import { Change } from "slate";
import { TypeOptions } from "../options";
import getAlignBlocks from "../utils/getAlignBlocks";

function removeAlign(opts: TypeOptions) {
  const { dataField } = opts;
  return (change: Change, align: string) => {
    const { value } = change;
    change.withoutNormalization(c => {
      getAlignBlocks(opts, value)
        .filter(n => align && n.data && n.data.get(dataField) === align)
        .forEach(n => {
          c.setNodeByKey(n.key, { data: n.data.delete(dataField) });
        });
    });
    return change;
  };
}

function setAlign(opts: TypeOptions) {
  const { dataField } = opts;
  return (change: Change, align: string) => {
    const { value } = change;
    const { alignments } = opts;
    if (!alignments || !alignments.includes(align)) return change;
    change.withoutNormalization(c => {
      getAlignBlocks(opts, value).forEach(n => {
        c.setNodeByKey(n.key, { data: n.data.set(dataField, align) });
      });
    });
    return change;
  };
}

function createChanges(opts: TypeOptions) {
  return {
    removeAlign: removeAlign(opts),
    setAlign: setAlign(opts)
  };
}

export default createChanges;
