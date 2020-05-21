import { Data } from "slate";

const rejectedBlocks = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

function deserializeFlatList(blocks, data, marks, block, childNodes, next) {
  const nodes = Array.from(childNodes);
  return nodes.map((node) => {
    const nodeElement = node as HTMLElement;
    const nodeChilds = Array.from(nodeElement.childNodes).reduce(
      (acc, childNode) => {
        const childNodeELement = childNode as HTMLElement;
        if (
          childNodeELement &&
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
      nodes: next(nodeChilds),
    };
  });
}

function deserializeNested(blocks, editor, el, block, childNodes, next) {
  const { data, marks } = editor.getData(el);
  const initialIndentation = data && data.indentation ? data.indentation : 0;
  const nodes: Node[] = Array.from(childNodes);
  return nodes
    .map((node) => {
      const updatedNode = node;
      const updatedNodeElement = node as HTMLElement;
      if (!updatedNodeElement || !updatedNodeElement.tagName) return undefined;
      if (updatedNodeElement.tagName.toLowerCase() === "li") {
        return deserializeFlatList(
          blocks,
          data,
          marks,
          block,
          [updatedNodeElement],
          next
        );
      }
      const { data: nodeData = {}, marks: nodeMarks } = editor.getData(
        updatedNode
      );
      const indentation =
        nodeData && nodeData.indentation
          ? nodeData.indentation
          : initialIndentation + 1;
      nodeData.indentation = indentation;
      const classNames =
        updatedNodeElement.className && updatedNodeElement.className.split(" ");
      const containsIndentation =
        classNames &&
        classNames.some((className) =>
          /(.*)(indentation|indent|level)(.*)(\d+)/.test(className)
        );
      if (!containsIndentation && classNames) {
        updatedNodeElement.classList.add(`indent-${indentation}`);
      } else if (!classNames) {
        updatedNodeElement.className = `indent-${indentation}`;
      }
      let nodeBlock = blocks[updatedNodeElement.tagName.toLowerCase()];
      if (nodeBlock === blocks.ul) {
        const blockClassNames =
          updatedNodeElement.className &&
          updatedNodeElement.className.split(" ");
        if (
          Array.isArray(blockClassNames) &&
          blockClassNames.some((className) =>
            /(list-task|checklist)/i.test(className)
          )
        ) {
          nodeBlock = blocks.check;
        }
      }
      const nodeChildNodes = Array.from(updatedNode.childNodes).filter(
        (childNode) =>
          childNode.nodeName !== "#text" ||
          (childNode.nodeName === "#text" &&
            childNode.textContent &&
            childNode.textContent.trim() !== "")
      );
      const isFlat = nodeChildNodes.every((childNode) => {
        const childNodeElement = childNode as HTMLElement;
        return !!(
          childNodeElement.tagName &&
          childNodeElement.tagName.toLowerCase() === "li"
        );
      });
      if (isFlat) {
        return deserializeFlatList(
          blocks,
          nodeData,
          nodeMarks,
          nodeBlock,
          nodeChildNodes,
          next
        );
      }
      return deserializeNested(
        blocks,
        editor,
        updatedNode,
        nodeBlock,
        nodeChildNodes,
        next
      );
    })
    .reduce((acc, val) => {
      if (!val) return acc;
      return Array.isArray(val) ? [...acc, ...val] : [...acc, val];
    }, []);
}

function deserializeFlat(blocks, editor, el, block, childNodes, next) {
  const { data, marks } = editor.getData(el);
  return deserializeFlatList(blocks, data, marks, block, childNodes, next);
}

export default function createRule(options, editor) {
  const { blockTypes } = Array.isArray(options)
    ? options.find((option) => option.blockTypes)
    : options;
  if (!blockTypes) return [];
  const blocks = {
    ul: blockTypes.unorderedlist,
    ol: blockTypes.orderedlist,
    check: blockTypes.checklist,
  };
  return [
    {
      deserialize(el: HTMLElement, next) {
        if (!el || !el.tagName) return next();
        let block = blocks[el.tagName.toLowerCase()];
        if (!block) return undefined;
        if (block === blocks.ul) {
          const classNames = el.className && el.className.split(" ");
          if (
            Array.isArray(classNames) &&
            classNames.some((className) =>
              /(list-task|checklist)/i.test(className)
            )
          ) {
            block = blocks.check;
          }
        }
        const nodes = Array.from(el.childNodes);
        const childNodes = nodes.filter(
          (node) =>
            node.nodeName !== "#text" ||
            (node.nodeName === "#text" &&
              node.textContent &&
              node.textContent.trim() !== "")
        );
        const isFlat = childNodes.every((node) => {
          const nodeElement = node as HTMLElement;
          return !!(
            nodeElement &&
            nodeElement.tagName &&
            nodeElement.tagName.toLowerCase() === "li"
          );
        });
        return isFlat
          ? deserializeFlat(blocks, editor, el, block, childNodes, next)
          : deserializeNested(blocks, editor, el, block, childNodes, next);
      },
    },
  ];
}
