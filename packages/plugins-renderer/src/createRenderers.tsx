import * as React from "react";
import { Editor } from "slate";
import { compose } from "recompose";

export interface Props {
  children: (...args: any[]) => JSX.Element;
}
export default function createRenderers() {
  let nodes = {};
  let nodeHOCs = {};
  let toolbars = {};
  let marks = {};
  let markHOCs = {};
  const nodeMappings = {};
  const markMappings = {};
  return {
    queries: {
      registerNodeMapping: (
        _editor: Editor,
        nodeName: string,
        nodeType: string
      ) => {
        nodeMappings[nodeName] = nodeType;
      },
      registerMarkMapping: (
        _editor: Editor,
        markName: string,
        markType: string
      ) => {
        markMappings[markName] = markType;
      },
      registerNodeRenderer: (_editor: Editor, nodeType: string, renderer) => {
        nodes[nodeType] = renderer;
      },
      registerMarkRenderer: (_editor: Editor, markType: string, renderer) => {
        marks[markType] = renderer;
      },
      registerToolbarRenderer: (
        _editor: Editor,
        nodeType: string,
        renderer
      ) => {
        toolbars[nodeType] = renderer;
      },
      registerNodeHocRenderer: (
        _editor: Editor,
        nodeType: string,
        renderer
      ) => {
        if (nodeHOCs[nodeType]) {
          nodeHOCs[nodeType] = compose(nodeHOCs[nodeType])(renderer);
        } else {
          nodeHOCs[nodeType] = renderer;
        }
      },
      registerMarkHocRenderer: (
        _editor: Editor,
        markType: string,
        renderer
      ) => {
        if (markHOCs[markType]) {
          markHOCs[markType] = compose(markHOCs[markType])(renderer);
        } else {
          markHOCs[markType] = renderer;
        }
      },
      getNodeRenderer: (_editor: Editor, nodeType: string) => nodes[nodeType],
      getNodeHOCRenderer: (_editor: Editor, nodeType: string) =>
        nodeHOCs[nodeType],
      getNodeType: (_editor: Editor, nodeName: string) =>
        nodeMappings[nodeName],
      getMarkRenderer: (_editor: Editor, markType: string) => marks[markType],
      getMarkHOCRenderer: (_editor: Editor, markType: string) =>
        markHOCs[markType],
      getMarkType: (_editor: Editor, markName: string) =>
        markMappings[markName],
      getToolbarRenderer: (_editor: Editor, nodeType: string) => nodes[nodeType]
    },
    renderNode: (props, editor: Editor, next) => {
      const { node } = props;
      const renderer =
        editor.getNodeRenderer(node.type) ||
        (node.object === "block" && editor.getNodeRenderer("default"));
      const hoc = editor.getNodeHOCRenderer(node.type);
      const toolbar = editor.getToolbarRenderer(node.type);
      const newProps = props;
      if (renderer) {
        if (hoc) {
          return (
            <React.Fragment>
              {toolbar ? toolbar(props) : undefined}
              {hoc(renderer(newProps))}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            {toolbar ? toolbar(props) : undefined}
            {() => renderer(newProps)}
          </React.Fragment>
        );
      }
      return next();
    },
    renderMark: (props, editor: Editor, next) => {
      const { mark } = props;
      const renderer = editor.getMarkRenderer(mark.type);
      const hoc = editor.getMarkHOCRenderer(mark.type);
      if (renderer) {
        if (hoc) {
          return <React.Fragment>{hoc(renderer(props))}</React.Fragment>;
        }
        return <React.Fragment>{renderer(props)}</React.Fragment>;
      }
      return next();
    }
  };
}
