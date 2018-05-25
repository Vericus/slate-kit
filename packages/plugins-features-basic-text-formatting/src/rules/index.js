// @flow

const markTags = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  strike: "strikethrough",
  del: "strikethrough"
};

export default function createRule(options, getData) {
  return [
    {
      deserialize(el, next) {
        const mark = markTags[el.tagName.toLowerCase()];
        if (!mark) return undefined;
        if (![...el.childNodes].every(node => node.nodeName === "#text")) {
          return {
            object: "mark",
            type: mark,
            nodes: next(el.childNodes)
          };
        }
        return {
          object: "text",
          leaves: [...el.childNodes].map(node => ({
            object: "leaf",
            text: node.nodeValue,
            marks: [
              {
                object: "mark",
                type: mark
              }
            ]
          }))
        };
      }
    },
    {
      deserialize(el) {
        if (el.nodeName === "#text") {
          const { parentNode } = el;
          const { data, marks } = getData(parentNode);
          return {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: el.nodeValue,
                data,
                marks
              }
            ]
          };
        }
        return undefined;
      }
    }
  ];
}
