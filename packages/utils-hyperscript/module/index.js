import { createHyperscript } from "slate-hyperscript";

/**
 * Define a hyperscript.
 *
 * @type {Function}
 */

var h = createHyperscript({
  blocks: {
    line: "line",
    paragraph: "paragraph",
    h1: "heading-one",
    h2: "heading-two",
    h3: "heading-three",
    h4: "heading-four",
    quote: "quote",
    code: "code",
    image: {
      type: "image",
      isVoid: true
    },
    ol: "numbered-list",
    ul: "bulleted-list",
    li: "list-item"
  },
  inlines: {
    link: "link",
    hashtag: "hashtag",
    comment: "comment",
    emoji: {
      type: "emoji",
      isVoid: true
    }
  },
  marks: {
    b: "bold",
    i: "italic",
    u: "underline",
    s: "strikethrough",
    color: "textColor",
    highlight: "textBackground"
  }
});

/**
 * Export.
 *
 * @type {Function}
 */

export default h;
