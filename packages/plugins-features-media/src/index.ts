import { Editor, Plugin } from "slate";
import Register from "@vericus/slate-kit-utils-register-helpers";
import Toolbar from "@vericus/slate-kit-utils-toolbars";
import Options, { TypeOption } from "./options";
import createQueries from "./queries";
import createCommands from "./commands";
import createSchema from "./schemas";
import createOnKeyDown from "./keyDown";

export default function createPlugin(
  pluginOptions: Partial<TypeOption> = {}
): Plugin[] {
  const options = Options.create(pluginOptions);
  const { blockTypes, toolbarRenderer, renderer, mediaTypes } = options;
  const mediaTypesOptions = Object.values(mediaTypes).reduce(
    (types, media) => [...types, media.type],
    []
  );
  const queries = createQueries(options);
  const commands = createCommands(options);
  const schema = createSchema(options);
  const onKeyDown = createOnKeyDown(options);

  let plugins: Plugin[] = [
    {
      queries,
      commands,
      schema,
      onKeyDown: options.withHandlers ? onKeyDown : undefined,
    },
    ...(toolbarRenderer
      ? [
          Toolbar({
            when: (editor: Editor, node) => {
              if (!mediaTypesOptions.includes(node.type)) return false;
              const { value } = editor.props;
              const { selection } = value;
              const { start, end } = selection;
              const selectedMedia = editor.getSelectedMediaBlock(value);
              if (!selectedMedia) return false;
              const src = editor.getSource(node);
              if (!src || src === "") return false;
              if (!(start.isInNode(node) || end.isInNode(node))) return false;
              return true;
            },
            render: toolbarRenderer,
          }),
        ]
      : []),
    Register({ nodes: blockTypes, options }),
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
