import { Editor } from "slate";
import Renderer from "@vericus/slate-kit-basic-typography-renderer";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createSchema from "./schemas";
import createRule from "./rules";

export default function createPlugin(pluginOptions: Partial<TypeOptions> = {}) {
  const options = Options.create(pluginOptions);
  const { blockTypes, defaultBlock } = options;
  const queries = createQueries(options);
  const commands = createCommands(options);
  const schema = createSchema(options);

  function onConstruct(editor: Editor, next) {
    if (editor.registerNodeMapping) {
      Object.entries(blockTypes).map(([nodeName, nodeType]) => {
        editor.registerNodeMapping(nodeName, nodeType);
      });
      editor.registerNodeMapping("default", defaultBlock);
    }
    if (editor.registerHTMLRule) {
      editor.registerHTMLRule(createRule(options, editor));
    }
    return next();
  }

  let plugins: any = [{ options, commands, queries, onConstruct, schema }];
  if (!options.externalRenderer) {
    plugins = [...plugins, { ...Renderer() }];
  }
  return plugins;
}
