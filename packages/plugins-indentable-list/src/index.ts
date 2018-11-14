import { Editor } from "slate";
import Renderer from "@vericus/slate-kit-indentable-list-renderer";
import AutoReplace from "@vericus/slate-kit-utils-auto-replace";
import createProps from "./props";
import Options, { TypeOptions } from "./options";
import createQueries from "./queries";
import createCommands from "./commands";
import createOnKeyDown from "./onKeyDown";
import createSchema from "./schemas";
import createRule from "./rules";

export function createPlugin(
  pluginOptions: Partial<TypeOptions> = {},
  pluginsWrapper: any
) {
  const options = new Options(pluginOptions);
  const { blockTypes } = options;
  const { orderedlist, unorderedlist, checklist } = blockTypes;
  const queries = createQueries(options);
  const commands = createCommands(options, pluginsWrapper);
  const schema = createSchema(options);
  const props = createProps(options, pluginsWrapper);
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);

  function onConstruct(editor: Editor, next) {
    Object.entries(blockTypes).map(([nodeName, nodeType]) => {
      editor.registerNodeMapping(nodeName, nodeType);
    });
    if (editor.registerPropsGetter) {
      editor.registerPropsGetter(props);
    }
    if (editor.registerHTMLRule) {
      editor.registerHTMLRule(createRule(options, editor));
    }
    return next();
  }

  let plugins: any[] = [
    {
      queries,
      commands,
      onKeyDown: options.withHandlers ? onKeyDown : undefined,
      options,
      onConstruct,
      schema
    },
    ...(options.withHandlers
      ? [
          AutoReplace({
            trigger: " ",
            before: /^(\d+\.)$/,
            command: (editor, matches, next) => {
              if (
                matches &&
                matches.beforeMatches &&
                matches.beforeMatches[0]
              ) {
                const numMatch = matches.beforeMatches[0].match(/(^\d+)/);
                if (numMatch && numMatch[0]) {
                  editor.createListWithType(orderedlist, numMatch[0]);
                }
                return;
              }
              return next();
            }
          }),
          AutoReplace({
            trigger: " ",
            before: /^(-)$/,
            command: (editor, matches, next) =>
              editor.createListWithType(unorderedlist)
          }),
          AutoReplace({
            trigger: " ",
            before: /^(\[\])$/,
            command: (editor, matches, next) =>
              editor.createListWithType(checklist)
          })
        ]
      : [])
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, Renderer()];
  }
  return plugins;
}

export default createPlugin;
