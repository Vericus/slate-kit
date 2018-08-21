const tagTextAlign = ["div", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
const tagFloat = ["div", "p", "h1", "h2", "h3", "img"];
const tagNames = [...tagTextAlign, ...tagFloat];
const alignments = ["left", "center", "right", "justify"];

export default function getData(
  el: HTMLElement,
  dataField: string | undefined
) {
  if (
    !dataField ||
    !el.tagName ||
    !tagNames.includes(el.tagName.toLowerCase())
  ) {
    return {};
  }
  if (el.style && typeof el.style.textAlign === "string") {
    const align = el.style.textAlign;
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }

  if (el.getAttribute("align")) {
    const align = el.getAttribute("align");
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }

  if (
    el.style &&
    typeof el.style.cssFloat === "string" &&
    el.style.cssFloat !== "clear"
  ) {
    const align = el.style.cssFloat;
    if (align && alignments.includes(align)) {
      return { data: { [dataField]: align } };
    }
  }
  return {};
}
