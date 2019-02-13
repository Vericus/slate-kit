const blocks = {
  p: "paragraph",
  h1: "heading-one",
  h2: "heading-two",
  h3: "heading-three",
  h4: "heading-four",
  h5: "heading-four",
  h6: "heading-four",
  blockquote: "blockquote"
};

export default function createRule(options, editor) {
  return [
    {
      deserialize(el, next) {
        const block = blocks[el.tagName.toLowerCase()];
        if (!block) return next();
        const { data, marks } = editor.getData(el);
        return {
          object: "block",
          data,
          marks,
          type: block,
          nodes: next(el.childNodes)
        };
      }
    }
  ];
}
