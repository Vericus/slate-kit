import { Node, Editor } from "slate";
import Options, { TypeOptions } from "./options";
import createRenderMark from "./renderMark";

export default function Placeholder(opts: Partial<TypeOptions>) {
  const options = Options.create(opts);
  const { when, render, placeholder, type } = options;

  const renderMark = createRenderMark(options);

  function decorateNode(node: Node, editor: Editor, next) {
    if (!editor.query(when, node)) {
      return next();
    }

    const others = next() || [];
    const first = node.getFirstText();
    const last = node.getLastText();
    if (first && last) {
      const decoration = {
        anchor: { key: first.key, offset: 0 },
        focus: { key: last.key, offset: 0 },
        mark: { type: `${type}-placeholder` }
      };
      return [...others, decoration];
    }

    return others;
  }

  return {
    decorateNode,
    renderMark
  };
}
