import { Editor } from "slate";
import Renderer from "@vericus/slate-kit-basic-text-formatting-renderer";
import Options, { TypeOptions } from "./options";
import createCommands from "./commands";
import createQueries from "./queries";
import createKeyBindings from "./keyBindings";
import createStyle from "./style";
import createRule from "./rules";

export default function createBasicTextFormatPlugin(
  pluginOptions: Partial<TypeOptions> = {}
) {
  const options = Options.create(pluginOptions);
  const { marks } = options;
  const commands = createCommands(options);
  const queries = createQueries(options);
  const { getData } = createStyle(options);
  const { externalRenderer, withHandlers } = options;

  function onConstruct(editor: Editor, next) {
    Object.entries(marks).map(([markName, markType]) => {
      editor.registerMarkMapping(markName, markType);
    });
    if (editor.registerDataGetter) {
      editor.registerDataGetter(getData);
    }
    if (editor.registerHTMLRule) {
      editor.registerHTMLRule(createRule(options, editor));
    }
    return next();
  }

  let plugins = [
    {
      options,
      commands,
      queries,
      onConstruct
    },
    ...(withHandlers ? createKeyBindings(options) : [])
  ];
  if (!externalRenderer) {
    plugins = [...plugins, Renderer()];
  }
  return plugins;
}
