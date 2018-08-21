import { Data } from "slate";

const blocks = {
  ul: "ul-list",
  ol: "ol-list"
};

const rejectedBlocks = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

function deserializeFlatList(data, marks, block, childNodes, next) {
  const nodes = Array.from(childNodes);
  return nodes.map(node => {
    const nodeElement = node as HTMLElement;
    const nodeChilds = Array.from(nodeElement.childNodes).reduce(
      (acc, childNode) => {
        const childNodeELement = childNode as HTMLElement;
        if (
          childNodeELement.tagName &&
          rejectedBlocks.includes(childNodeELement.tagName.toLowerCase())
        ) {
          return [...acc, ...Array.from(childNode.childNodes)];
        }
        return [...acc, childNode];
      },
      []
    );
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
  const nodes: Node[] = Array.from(childNodes);
  return nodes
    .map(node => {
      const updatedNode = node;
      const updatedNodeElement = node as HTMLElement;
      if (
        updatedNodeElement.tagName &&
        updatedNodeElement.tagName.toLowerCase() === "li"
      ) {
        return deserializeFlatList(
          data,
          marks,
          block,
          [updatedNodeElement],
          next
        );
      }
      const { data: nodeData = {}, marks: nodeMarks } = getData(updatedNode);
      const indentation =
        nodeData && nodeData.indentation
          ? nodeData.indentation
          : initialIndentation + 1;
      nodeData.indentation = indentation;
      const classNames =
        updatedNodeElement.className && updatedNodeElement.className.split(" ");
      const containsIndentation =
        classNames &&
        classNames.some(className =>
          /(.*)(indent|level)(.*)(\d+)/.test(className)
        );
      if (!containsIndentation && classNames) {
        updatedNodeElement.classList.add(`indent-${indentation + 1}`);
      } else if (!classNames) {
        updatedNodeElement.className = `indent-${indentation + 1}`;
      }
      const nodeBlock = blocks[updatedNodeElement.tagName.toLowerCase()];
      const nodeChildNodes = Array.from(updatedNode.childNodes).filter(
        childNode =>
          childNode.nodeName !== "#text" ||
          (childNode.nodeName === "#text" &&
            childNode.textContent &&
            childNode.textContent.trim() !== "")
      );
      const isFlat = nodeChildNodes.every(childNode => {
        const childNodeElement = childNode as HTMLElement;
        return !!(
          childNodeElement.tagName &&
          childNodeElement.tagName.toLowerCase() === "li"
        );
      });
      if (isFlat) {
        return deserializeFlatList(
          nodeData,
          nodeMarks,
          nodeBlock,
          nodeChildNodes,
          next
        );
      }
      return deserializeNested(
        getData,
        updatedNode,
        nodeBlock,
        nodeChildNodes,
        next
      );
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
      deserialize(el: HTMLElement, next) {
        const block = blocks[el.tagName.toLowerCase()];
        if (!block) return undefined;
        const nodes = Array.from(el.childNodes);
        const childNodes = nodes.filter(
          node =>
            node.nodeName !== "#text" ||
            (node.nodeName === "#text" &&
              node.textContent &&
              node.textContent.trim() !== "")
        );
        const isFlat = childNodes.every((node, index, array) => {
          const nodeElement = node as HTMLElement;
          return !!(
            nodeElement &&
            nodeElement.tagName &&
            nodeElement.tagName.toLowerCase() === "li"
          );
        });
        return isFlat
          ? deserializeFlat(getData, el, block, childNodes, next)
          : deserializeNested(getData, el, block, childNodes, next);
      }
    }
  ];
}
