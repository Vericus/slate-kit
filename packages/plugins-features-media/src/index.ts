import Renderer from "@vericus/slate-kit-media-renderer";
import Options, { TypeOption } from "./options";
import createUtils from "./utils";
import createChanges from "./changes";
import createSchema from "./schemas";
import createOnKeyDown from "./keyDown";

export default function createPlugin(
  pluginOptions: Partial<TypeOption>,
  pluginsWrapper
) {
  const options = Options.create(pluginOptions);
  const utils = createUtils(options);
  const changes = createChanges(options, utils, pluginsWrapper);
  const schema = createSchema(options);
  const onKeyDown = createOnKeyDown(options, utils, pluginsWrapper);
  return {
    utils,
    changes,
    schema,
    options,
    onKeyDown: options.withHandlers ? onKeyDown : undefined,
    ...(options.externalRenderer ? {} : Renderer(options, changes, utils))
  };
}
