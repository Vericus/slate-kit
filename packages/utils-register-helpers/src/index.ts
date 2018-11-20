import { Editor } from "slate";

export default function register(pluginOptions) {
  const editorOptions = {};
  const {
    marks,
    marksRenderer,
    marksHOCRenderer,
    nodes,
    nodesRenderer,
    nodesHOCRenderer,
    props,
    getData,
    createRule,
    options = {}
  } = pluginOptions;
  return {
    queries: {
      registerOptions: (_editor: Editor, label: string, options: any) => {
        editorOptions[label] = options;
      },
      getOptions: (_editor: Editor, label: string) => editorOptions[label]
    },
    onConstruct: (editor: Editor, next) => {
      if (editor.registerPropsGetter && props) {
        editor.registerPropsGetter(props);
      }
      if (editor.registerDataGetter && getData) {
        editor.registerDataGetter(getData);
      }
      if (editor.registerHTMLRule && createRule && options) {
        editor.registerHTMLRule(createRule(options, editor));
      }

      if (options.label) {
        editor.registerOptions(options.label, options);
      }

      if (editor.registerMarkMapping && marks) {
        Object.entries(marks).map(([markName, markType]) => {
          editor.registerMarkMapping(markName, markType);
        });
      }
      if (editor.registerNodeMapping && nodes) {
        Object.entries(nodes).map(([nodeName, nodeType]) => {
          editor.registerNodeMapping(nodeName, nodeType);
        });
      }
      if (editor.getMarkType && editor.registerMarkRenderer && marksRenderer) {
        Object.entries(marksRenderer).map(([markName, renderer]) => {
          editor.registerMarkRenderer(editor.getMarkType(markName), renderer);
        });
      }
      if (editor.getNodeType && editor.registerNodeRenderer && nodesRenderer) {
        Object.entries(nodesRenderer).map(([nodeName, renderer]) => {
          editor.registerNodeRenderer(editor.getNodeType(nodeName), renderer);
        });
      }
      if (
        editor.getNodeType &&
        editor.registerNodeHocRenderer &&
        nodesHOCRenderer
      ) {
        Object.entries(nodesHOCRenderer).map(
          ([nodeName, rendererCollection]) => {
            Object.entries(rendererCollection).map(([label, renderer]) =>
              editor.registerNodeHocRenderer(
                editor.getNodeType(nodeName),
                label,
                renderer
              )
            );
          }
        );
      }
      if (
        editor.getMarkType &&
        editor.registerMarkHocRenderer &&
        marksHOCRenderer
      ) {
        Object.entries(marksHOCRenderer).map(
          ([markName, rendererCollection]) => {
            Object.entries(rendererCollection).map(([label, renderer]) =>
              editor.registerMarkHocRenderer(
                editor.getMarkType(markName),
                label,
                renderer
              )
            );
          }
        );
      }
      return next();
    }
  };
}
