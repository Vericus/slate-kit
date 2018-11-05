import { Editor, Block } from "slate";
import { TypeOptions } from "../options";

export default function createCommands(pluginOptions: TypeOptions) {
  const { blockTypes } = pluginOptions;
  const validBlockTypes: { [key: string]: string } = Object.entries(
    blockTypes
  ).reduce((types, [type, typeName]) => {
    if (typeof typeName === "string") {
      return {
        ...types,
        [type]: typeName
      };
    }
    return types;
  }, {});
  const slateBlockTypes = Object.values(validBlockTypes);
  return {
    toggleTypography: (editor: Editor, type: string) => {
      if (slateBlockTypes.includes(type)) {
        const selectedBlocks = editor.getHighestSelectedBlocks(editor.value);
        selectedBlocks.toArray().forEach(block => {
          if (!Block.isBlock(block)) return;
          if (editor.isTypography(block)) {
            editor.setNodeByKey(block.key, type);
          } else {
            block.getBlocks().forEach(nodeBlock => {
              if (Block.isBlock(nodeBlock) && editor.isTypography(nodeBlock)) {
                editor.setNodeByKey(nodeBlock.key, type);
              }
            });
          }
        });
        editor.focus();
      }
    }
  };
}
