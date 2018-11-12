import { Editor, Block, Inline } from "slate";
import { TypeOptions } from "../options";

function removeAlign(opts: TypeOptions) {
  const { dataField } = opts;
  return (editor: Editor, align: string): Editor | void => {
    const { value } = editor;
    editor.withoutNormalizing(e => {
      editor
        .getAlignBlocks(value)
        .filter(n => align && n.data && n.data.get(dataField) === align)
        .forEach((n: Block | Inline) =>
          e.setNodeByKey(n.key, { data: n.data.delete(dataField) })
        );
    });
  };
}

function setAlign(opts: TypeOptions) {
  const { dataField } = opts;
  return (editor: Editor, align: string): Editor | void => {
    const { value } = editor;
    const { alignments } = opts;
    if (!alignments || !alignments.includes(align)) return;
    editor.withoutNormalizing(e => {
      editor.getAlignBlocks(value).forEach((n: Block | Inline) => {
        e.setNodeByKey(n.key, { data: n.data.set(dataField, align) });
      });
    });
  };
}

function createCommands(opts: TypeOptions) {
  return {
    removeAlign: removeAlign(opts),
    setAlign: setAlign(opts)
  };
}

export default createCommands;
