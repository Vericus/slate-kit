import Register from "@vericus/slate-kit-utils-register-helpers";
import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createProps from "./props";
import createCommands from "./commands";
import createQueries from "./queries";

export default function createPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = Options.create(pluginOptions);
  const { marks } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const props = createProps(options);

  let plugins: any = [
    Register({
      options,
      marks,
      props
    }),
    {
      commands,
      queries
    }
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer(marks) }];
  }

  return plugins;
}
