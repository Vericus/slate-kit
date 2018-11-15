import { Editor } from "slate";

export default function register(options) {
  const {
    marks,
    marksRenderer,
    nodes,
    nodesRenderer,
    props,
    getData,
    createRule,
    ruleOptions = {}
  } = options;
  return {
    onConstruct: (editor: Editor, next) => {
      if (editor.registerPropsGetter && props) {
        editor.registerPropsGetter(props);
      }
      if (editor.registerDataGetter && getData) {
        editor.registerDataGetter(getData);
      }
      if (editor.registerHTMLRule && createRule && ruleOptions) {
        editor.registerHTMLRule(createRule(ruleOptions, editor));
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
      return next();
    }
  };
}
