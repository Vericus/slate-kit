import { Editor } from "slate";

// check if currentSelection has block of type
export default function hasBlock(editor: Editor, type: string) {
  return editor.value.blocks.some(node => !!(node && node.type === type));
}
