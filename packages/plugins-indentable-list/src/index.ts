import Renderer from "@vericus/slate-kit-indentable-list-renderer";
import AutoReplace from "slate-auto-replace";
import createProps from "./props";
import Options, { TypeOptions } from "./options";
import createUtils from "./utils";
import createChanges from "./changes";
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
  const utils = createUtils(options);
  const changes = createChanges(options, pluginsWrapper);
  const { createListWithType } = changes;
  const schema = createSchema(options);
  const props = createProps(options, pluginsWrapper);
  const rules = createRule(options);
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  let plugins = [
    {
      rules,
      utils,
      changes,
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
            change: (change, e, matches) => {
              const type = orderedlist;
              return change.call(createListWithType, type, matches.before[1]);
            }
          }),
          AutoReplace({
            trigger: "space",
            before: /^(-)$/,
            change: change => {
              const type = unorderedlist;
              return change.call(createListWithType, type);
            }
          }),
          AutoReplace({
            trigger: "space",
            before: /^(\[\])$/,
            change: change => {
              const type = checklist;
              return change.call(createListWithType, type);
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
