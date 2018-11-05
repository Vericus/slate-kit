import Renderer from "@vericus/slate-kit-media-renderer";
import Options, { TypeOption } from "./options";
import createQueries from "./queries";
import createCommands from "./commands";
import createSchema from "./schemas";
import createOnKeyDown from "./keyDown";

export default function createPlugin(
  pluginOptions: Partial<TypeOption>,
  pluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const queries = createQueries(options);
  const commands = createCommands(options, pluginsWrapper);
  const schema = createSchema(options);
  const onKeyDown = createOnKeyDown(options, pluginsWrapper);
  return {
    queries,
    commands,
    schema,
    options,
    onKeyDown: options.withHandlers ? onKeyDown : undefined,
    ...(options.externalRenderer ? {} : Renderer(options))
  };
}
