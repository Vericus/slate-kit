const markTags = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  strike: "strikethrough",
  del: "strikethrough",
};

export default function createRule(options, editor) {
  const { marks: markTypes } = Array.isArray(options)
    ? options.find((option) => option.marks)
    : options;
  return [
    {
      deserialize(el, next) {
        const mark = markTags[el.tagName.toLowerCase()];
        if (!mark || !el.childNodes) return undefined;
        if (
          !Array.from(el.childNodes).every(
            (node: HTMLElement) => node.nodeName === "#text"
          )
        ) {
          return {
            object: "mark",
            type: markTypes[mark],
            nodes: next(el.childNodes),
          };
        }
        return {
          object: "text",
          leaves: Array.from(el.childNodes).map((node: HTMLElement) => ({
            object: "leaf",
            text: node.nodeValue,
            marks: [
              {
                object: "mark",
                type: markTypes[mark],
              },
            ],
          })),
        };
      },
    },
    {
      deserialize(el) {
        if (el.nodeName === "#text") {
          const { parentNode } = el;
          const { data, marks } = editor.getData(parentNode);
          return {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: el.nodeValue,
                data,
                marks,
              },
            ],
          };
        }
        return undefined;
      },
    },
  ];
}
