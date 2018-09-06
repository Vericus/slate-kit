import Options, { TypeOption } from "./options";
import createUtils from "./utils";
import createChanges from "./changes";
import createSchema from "./schemas";

export default function createPlugin(pluginOptions: Partial<TypeOption>) {
  const options = new Options(pluginOptions);
  const changes = createChanges(options);
  const utils = createUtils(options);
  const schema = createSchema(options);
  return {
    utils,
    changes,
    schema
  };
}
