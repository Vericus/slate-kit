// @flow
import AutoReplace from "slate-auto-replace";
import Options, { type typeOptions } from "./options";
import createRenderer from "./renderers";
import createProps from "./props";
import createUtils from "./utils";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";
import createSchema from "./schemas";

export function createPlugin(pluginOptions: typeOptions, pluginsWrapper) {
  const opts = new Options(pluginOptions);
  const { ordered, unordered, checkList } = opts;
  const { renderNode } = createRenderer(opts, pluginsWrapper);
  const utils = createUtils(opts);
  const changes = createChanges(opts, pluginsWrapper);
  const { createListWithType } = changes;
  const props = createProps(opts, pluginsWrapper);
  const schemas = createSchema(opts);
  const onKeyDown = createOnKeyDown(opts, pluginsWrapper);
  return {
    plugins: [
      {
        props,
        renderNode,
        utils,
        changes,
        onKeyDown,
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
