// @flow

const tagTextAlign = ["div", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
const tagFloat = ["div", "p", "h1", "h2", "h3", "img"];
const tagNames = [...tagTextAlign, ...tagFloat];
const alignments = ["left", "center", "right", "justify"];

export default function getData(
  el: Element,
  dataField: string
): { textAlign?: string } {
  if (!el.tagName || !tagNames.includes(el.tagName.toLowerCase())) return {};
  if (el.style && typeof el.style.textAlign === "string") {
    const align: string = el.style.textAlign;
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }

  if (el.getAttribute("align")) {
    const align: ?string = el.getAttribute("align");
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }

  if (
    el.style &&
    typeof el.style.float === "string" &&
    el.style.float !== "clear"
  ) {
    const align: string = el.style.float;
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }
  return {};
}
