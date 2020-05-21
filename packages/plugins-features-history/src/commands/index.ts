import handleUndo from "./handleUndo";
import handleRedo from "./handleRedo";

export default function createCommands() {
  return {
    handleUndo,
    handleRedo,
  };
}
