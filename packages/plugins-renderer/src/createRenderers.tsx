import * as React from "react";
import { Editor, Plugin } from "slate";
import { compose } from "recompose";

export interface Props {
  children: (...args: any[]) => JSX.Element;
}

const SlateKitNode: React.SFC<Props> = props => props.children(props);

export default function createRenderers(): Plugin {
  const nodes = {};
  const nodeHOCsLabel = {};
  const nodeHOCs = {};
  const marks = {};
  const markHOCsLabel = {};
  const markHOCs = {};
  const nodeMappings = {};
  const markMappings = {};
  let propsGetter: any[] = [];
  return {
    queries: {
      registerPropsGetter: (_editor: Editor, getter) => {
        propsGetter = [...propsGetter, getter];
      },
      getProps: (_editor: Editor, props) =>
        propsGetter.reduce((memo, propGetter) => propGetter(memo), props),
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
      registerNodeHocRenderer: (
        _editor: Editor,
        nodeType: string,
        label: string,
        renderer
      ) => {
        if (nodeHOCs[nodeType] && nodeHOCsLabel[nodeType]) {
          if (!nodeHOCsLabel[nodeType][label]) {
            nodeHOCs[nodeType] = compose(
              nodeHOCs[nodeType],
              renderer
            );
          }
        } else {
          if (nodeHOCsLabel[nodeType]) {
            nodeHOCsLabel[nodeType][label] = true;
          } else {
            nodeHOCsLabel[nodeType] = {
              [label]: true
            };
          }
          nodeHOCs[nodeType] = compose(renderer);
        }
      },
      registerMarkHocRenderer: (
        _editor: Editor,
        markType: string,
        label: string,
        renderer
      ) => {
        if (markHOCs[markType]) {
          if (!markHOCsLabel[markType][label]) {
            markHOCs[markType] = compose(
              markHOCs[markType],
              renderer
            );
          }
        } else {
          if (markHOCsLabel[markType]) {
            markHOCsLabel[markType][label] = true;
          } else {
            markHOCsLabel[markType] = {
              [label]: true
            };
          }
          markHOCs[markType] = compose(renderer);
        }
      },
      getNodeRenderer: (_editor: Editor, nodeType: string) => nodes[nodeType],
      getNodeHOCRenderer: (_editor: Editor, nodeType: string) =>
        nodeHOCs[nodeType],
      getNodeType: (_editor: Editor, nodeName: string) =>
        nodeMappings[nodeName],
      getNodeTypes: (_editor: Editor): string[] => Object.values(nodeMappings),
      getMarkRenderer: (_editor: Editor, markType: string) => marks[markType],
      getMarkHOCRenderer: (_editor: Editor, markType: string) =>
        markHOCs[markType],
      getMarkType: (_editor: Editor, markName: string) =>
        markMappings[markName],
      getMarkTypes: (_editor: Editor): string[] => Object.values(markMappings)
    },
    renderNode: (props, editor: Editor, next) => {
      const { node } = props;
      const renderer =
        editor.getNodeRenderer(node.type) ||
        (node.object === "block" &&
          editor.getNodeRenderer(editor.getNodeType("default")));
      const hoc = editor.getNodeHOCRenderer(node.type);
      const newProps = editor.getProps(props);
      const toolbar = editor.run("renderToolbar", props);
      if (renderer) {
        if (hoc) {
          return (
            <React.Fragment>
              {toolbar}
              <SlateKitNode>{() => hoc(renderer)(newProps)}</SlateKitNode>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            {toolbar}
            <SlateKitNode>{() => renderer(newProps)}</SlateKitNode>
          </React.Fragment>
        );
      }
      return next();
    },
    renderMark: (props, editor: Editor, next) => {
      const { mark } = props;
      const renderer = editor.getMarkRenderer(mark.type);
      const hoc = editor.getMarkHOCRenderer(mark.type);
      const newProps = editor.getProps(props);
      if (renderer) {
        if (hoc) {
          return (
            <React.Fragment>
              <SlateKitNode>{() => hoc(renderer)(newProps)}</SlateKitNode>
            </React.Fragment>
          );
        }
        return (
          <React.Fragment>
            <SlateKitNode>{() => renderer(newProps)}</SlateKitNode>
          </React.Fragment>
        );
      }
      return next();
    }
  };
}
