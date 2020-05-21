import Register from "@vericus/slate-kit-utils-register-helpers";
import { Plugin } from "slate";
import Options, { TypeOptions } from "./options";
import createStyle from "./style";
import createProps from "./props";
import createCommands from "./commands";
import createQueries from "./queries";

export default function createPlugin(
  pluginOptions: Partial<TypeOptions> = {}
): Plugin[] {
  const options = Options.create(pluginOptions);
  const { marks, renderer } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const { getData } = createStyle(options);
  const props = createProps(options);

  let plugins: Plugin[] = [
    Register({
      options,
      marks,
      props,
      getData,
    }),
    {
      commands,
      queries,
    },
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
