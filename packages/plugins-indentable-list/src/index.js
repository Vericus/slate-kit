// @flow
import Renderer from "@vericus/slate-kit-indentable-list-renderer";
import AutoReplace from "slate-auto-replace";
import Options, { type typeOptions } from "./options";
import createProps from "./props";
import createUtils from "./utils";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";
import createSchema from "./schemas";
import createRule from "./rules";

export function createPlugin(pluginOptions: typeOptions, pluginsWrapper: any) {
  const options = new Options(pluginOptions);
  const { ordered, unordered, checkList } = options;
  const utils = createUtils(options);
  const changes = createChanges(options, pluginsWrapper);
  const { createListWithType } = changes;
  const props = createProps(options, pluginsWrapper);
  const schemas = createSchema(options);
  const rules = createRule;
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  let plugins = [
    {
      props,
      rules,
      utils,
      changes,
      onKeyDown,
      options,
      ...schemas
    },
    AutoReplace({
      trigger: "space",
      before: /^(\d+)(\.)$/,
      transform: (transform, e, matches) => {
        const type = ordered;
        return transform.call(createListWithType, type, matches.before[1]);
      }
    }),
    AutoReplace({
      trigger: "space",
      before: /^(-)$/,
      transform: transform => {
        const type = unordered;
        return transform.call(createListWithType, type);
      }
    }),
    AutoReplace({
      trigger: "space",
      before: /^(\[\])$/,
      transform: transform => {
        const type = checkList;
        return transform.call(createListWithType, type);
      }
    })
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer(pluginOptions, pluginsWrapper) }];
  }
  return {
    plugins
  };
}

export default createPlugin;
