import { Editor } from "slate";
import Renderer from "@vericus/slate-kit-highlight-text-renderer";
import Options, { TypeOptions } from "./options";
import createProps from "./props";
import createCommands from "./commands";
import createQueries from "./queries";

export default function createPlugin(
  pluginOptions: TypeOptions,
  pluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const { type, marks } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const props = createProps(options);

  function onConstruct(editor: Editor, next) {
    Object.entries(marks).map(([markName, markType]) => {
      editor.registerMarkMapping(markName, markType);
    });
    return next();
  }

  let plugins: any = [
    {
      options,
      commands,
      queries,
      props,
      onConstruct
    }
  ];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer(type) }];
  }

  return {
    plugins
  };
}
