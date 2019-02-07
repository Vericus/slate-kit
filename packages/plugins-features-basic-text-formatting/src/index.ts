import Register from "@vericus/slate-kit-utils-register-helpers";
import { Plugin } from "slate";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createKeyBindings from "./keyBindings";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(
  pluginOptions: Partial<TypeOptions> = {}
): Plugin[] {
  const options = Options.create(pluginOptions);
  const { marks } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const { getData } = createStyle(options);
  const { renderer, withHandlers } = options;

  let plugins: Plugin[] = [
    Register({
      marks,
      getData,
      createRule,
      options
    }),
    {
      commands,
      queries
    },
    ...(withHandlers ? createKeyBindings(options) : [])
  ];
  if (renderer) {
    const rendererPlugins = renderer(options);
    if (Array.isArray(rendererPlugins)) {
      plugins = [...plugins, ...rendererPlugins];
    } else {
      plugins = [...plugins, rendererPlugins];
    }
  }
  return plugins;
}
