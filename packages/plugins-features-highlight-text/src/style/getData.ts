import { Set } from "immutable";
import { Mark, Data } from "slate";

function getLeafNode(el: HTMLElement): HTMLElement | null {
  if (el.hasAttributes()) {
    const { parentNode } = el;
    if (el.getAttribute("data-slate-leaf") === "true") {
      return el;
    }
    if (parentNode) {
      return getLeafNode(parentNode as HTMLElement);
    }
  }
  return null;
}

export default function getData(
  type: string,
  data: string,
  el: HTMLElement
): { marks?: Mark[] } {
  let marks = Set<Mark>();
  let node = getLeafNode(el) || el;
  while (node) {
    const { firstChild } = node;
    if (node.hasAttributes && node.hasAttributes()) {
      const color = node.getAttribute(`data-cadmus-${type}`);
      if (color) {
        marks = marks.add(
          new Mark({
            type,
            data: Data.create({
              [data]: color
            })
          })
        );
      }
    }
    node = firstChild as HTMLElement;
  }
  if (marks && marks.size > 0) {
    return { marks: marks.toArray() };
  }
  return {};
}
