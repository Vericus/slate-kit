import Renderer from "@vericus/slate-kit-indentable-list-renderer";
import AutoReplace from "slate-auto-replace";
import Options, { TypeOptions } from "./options";
import createUtils from "./utils";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";
import createSchema from "./schemas";
import createRule from "./rules";

export function createPlugin(pluginOptions: TypeOptions, pluginsWrapper: any) {
  const options = new Options(pluginOptions);
  const { ordered, unordered, checkList } = options;
  const utils = createUtils(options);
  const changes = createChanges(options, pluginsWrapper);
  const { createListWithType } = changes;
  const schema = createSchema(options);
  const rules = createRule;
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  const rendererOptions = { ...options.toJS() };
  delete rendererOptions.externalRenderer;
  const { renderNode, props } = Renderer(
    { ...rendererOptions, changes },
    pluginsWrapper
  );
  let plugins = [
    {
      rules,
      utils,
      changes,
      onKeyDown,
      options,
      props,
      schema
    },
    AutoReplace({
      trigger: "space",
      before: /^(\d+)(\.)$/,
      change: (change, e, matches) => {
        const type = ordered;
        return change.call(createListWithType, type, matches.before[1]);
      }
    }),
    AutoReplace({
      trigger: "space",
      before: /^(-)$/,
      change: change => {
        const type = unordered;
        return change.call(createListWithType, type);
      }
    }),
    AutoReplace({
      trigger: "space",
      before: /^(\[\])$/,
      change: change => {
        const type = checkList;
        return change.call(createListWithType, type);
      }
    })
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { renderNode }];
  }
  return {
    plugins
  };
}

export default createPlugin;
