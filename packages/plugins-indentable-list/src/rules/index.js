// @flow
import { Data } from "slate";

const blocks = {
  ul: "ul-list",
  ol: "ol-list"
};

const rejectedBlocks = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

function deserializeFlatList(data, marks, block, childNodes, next) {
  const nodes = Array.from(childNodes);
  return nodes.map(node => {
    const nodeChilds = [...node.childNodes].reduce((acc, childNode) => {
      if (
        childNode.tagName &&
        rejectedBlocks.includes(childNode.tagName.toLowerCase())
      ) {
        return [...acc, ...childNode.childNodes];
      }
      return [...acc, childNode];
    }, []);
    return {
      object: "block",
      type: block,
      data: Data.create(data),
      marks,
      nodes: next(nodeChilds)
    };
  });
}

function deserializeNested(getData, el, block, childNodes, next) {
  const { data, marks } = getData(el);
  const initialIndentation = data && data.indentation ? data.indentation : 0;
  const nodes = Array.from(childNodes);
  return nodes
    .map(node => {
      if (node.tagName && node.tagName.toLowerCase() === "li") {
        return deserializeFlatList(data, marks, block, [node], next);
      }
      const { data: nodeData = {}, marks: nodeMarks } = getData(node);
      const indentation =
        nodeData && nodeData.indentation
          ? nodeData.indentation
          : initialIndentation + 1;
      nodeData.indentation = indentation;
      const classNames = node.className && node.className.split(" ");
      const containsIndentation =
        classNames &&
        classNames.some(className =>
          /(.*)(indent|level)(.*)(\d+)/.test(className)
        );
      if (!containsIndentation && classNames) {
        node.classList.add(`indent-${indentation + 1}`);
      } else if (!classNames) {
        node.className = `indent-${indentation + 1}`;
      }
      const nodeBlock = blocks[node.tagName.toLowerCase()];
      const nodeChildNodes = [...node.childNodes].filter(
        childNode =>
          childNode.nodeName !== "#text" ||
          (childNode.nodeName === "#text" &&
            childNode.textContent.trim() !== "")
      );
      const isFlat = nodeChildNodes.every(
        childNode =>
          childNode.tagName && childNode.tagName.toLowerCase() === "li"
      );
      if (isFlat) {
        return deserializeFlatList(
          nodeData,
          nodeMarks,
          nodeBlock,
          nodeChildNodes,
          next
        );
      }
      return deserializeNested(getData, node, nodeBlock, nodeChildNodes, next);
    })
    .reduce(
      (acc, val) => (Array.isArray(val) ? [...acc, ...val] : [...acc, val]),
      []
    );
}

function deserializeFlat(getData, el, block, childNodes, next) {
  const { data, marks } = getData(el);
  return deserializeFlatList(data, marks, block, childNodes, next);
}

export default function createRule(options, getData) {
  return [
    {
      deserialize(el, next) {
        const block = blocks[el.tagName.toLowerCase()];
        if (!block) return undefined;
        const nodes = Array.from(el.childNodes);
        const childNodes = nodes.filter(
          node =>
            node.nodeName !== "#text" ||
            (node.nodeName === "#text" && node.textContent.trim() !== "")
        );
        const isFlat = childNodes.every(
          node => node.tagName && node.tagName.toLowerCase() === "li"
        );
        return isFlat
          ? deserializeFlat(getData, el, block, childNodes, next)
          : deserializeNested(getData, el, block, childNodes, next);
      }
    }
  ];
}
