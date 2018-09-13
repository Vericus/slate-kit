import Renderer from "@vericus/slate-kit-media-renderer";
import Options, { TypeOption } from "./options";
import createUtils from "./utils";
import createChanges from "./changes";
import createSchema from "./schemas";
import createProps from "./props";
import createOnKeyDown from "./keyDown";

export default function createPlugin(pluginOptions: Partial<TypeOption>) {
  const options = Options.create(pluginOptions);
  const changes = createChanges(options);
  const utils = createUtils(options);
  const schema = createSchema(options);
  const props = createProps(options);
  const onKeyDown = createOnKeyDown(options);
  return {
    utils,
    changes,
    schema,
    options,
    props,
    onKeyDown,
    ...Renderer(options)
  };
}
