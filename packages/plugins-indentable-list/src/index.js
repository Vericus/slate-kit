// @flow
import AutoReplace from "slate-auto-replace";
import Options, { type typeOptions } from "./options";
import createRenderer from "./renderers";
import createProps from "./props";
import createUtils from "./utils";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";
import createSchema from "./schemas";

export function createPlugin(pluginOptions: typeOptions, pluginsWrapper: any) {
  const options = new Options(pluginOptions);
  const { ordered, unordered, checkList } = options;
  const { renderNode } = createRenderer(options, pluginsWrapper);
  const utils = createUtils(options);
  const changes = createChanges(options, pluginsWrapper);
  const { createListWithType } = changes;
  const props = createProps(options, pluginsWrapper);
  const schemas = createSchema(options);
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  return {
    plugins: [
      {
        props,
        renderNode,
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
    ]
  };
}

export default createPlugin;
