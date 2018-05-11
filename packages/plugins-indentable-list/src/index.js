// @flow
import AutoReplace from "slate-auto-replace";
import Options, { type typeOptions } from "./options";
import createRenderer from "./renderers";
import createProps from "./props";
import createUtils from "./utils";
import createChanges from "./changes";
import createOnKeyDown from "./onKeyDown";

export function createPlugin(pluginOptions: typeOptions, pluginsWrapper) {
  const opts = new Options(pluginOptions);
  const { ordered, unordered } = opts;
  const { renderNode } = createRenderer(opts, pluginsWrapper);
  const utils = createUtils(opts);
  const changes = createChanges(opts, utils, pluginsWrapper);
  const { createListWithType } = changes;
  const props = createProps(opts, changes);
  const onKeyDown = createOnKeyDown(opts, changes, utils);
  return {
    plugins: [
      {
        props,
        renderNode,
        utils,
        changes,
        onKeyDown
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
      })
    ]
  };
}

export default createPlugin;
