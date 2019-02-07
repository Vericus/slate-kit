import { Node, Editor, Plugin } from "slate";
import Options, { TypeOptions } from "./options";
import createRenderMark from "./renderMark";

export default function Placeholder(opts: Partial<TypeOptions>): Plugin {
  const options = Options.create(opts);
  const { when, type } = options;

  const renderMark = createRenderMark(options);

  function decorateNode(node: Node, editor: Editor, next) {
    if (!editor.query(when, node)) {
      return next();
    }

    const others = next() || [];
    const first = node.getFirstText();
    const last = node.getLastText();
    const containsPlaceholders = others.some(
      decoration =>
        decoration &&
        decoration.mark &&
        decoration.mark.type &&
        /.*-placeholder$/.test(decoration.mark.type)
    );
    if (first && last && !containsPlaceholders) {
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
