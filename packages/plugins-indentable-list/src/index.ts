import Renderer from "@vericus/slate-kit-indentable-list-renderer";
import AutoReplace from "slate-auto-replace";
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
  const rules = createRule;
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  let plugins = [
    {
      rules,
      queries,
      commands,
      onKeyDown: options.withHandlers ? onKeyDown : undefined,
      options,
      props,
      schema
    },
    ...(options.withHandlers
      ? [
          AutoReplace({
            trigger: "space",
            before: /^(\d+)(\.)$/,
            change: (editor, e, matches) => {
              const type = orderedlist;
              return editor
                .createListWithType(type, matches.before[1])
                .normalize();
            }
          }),
          AutoReplace({
            trigger: "space",
            before: /^(-)$/,
            change: (editor, e, matches) => {
              const type = unorderedlist;
              return editor.createListWithType(type).normalize();
            }
          }),
          AutoReplace({
            trigger: "space",
            before: /^(\[\])$/,
            change: (editor, e, matches) => {
              const type = checklist;
              return editor.createListWithType(type).normalize();
            }
          })
        ]
      : [])
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer() }];
  }
  return {
    plugins
  };
}

export default createPlugin;
