import { Record, List } from "immutable";
import { Operation } from "slate";

export interface TypeOptions {
  onUndo?: (operations: List<Operation>) => void;
  onRedo?: (operations: List<Operation>) => void;
}

const defaultOptions: TypeOptions = {
  onUndo: undefined,
  onRedo: undefined
};

class Options extends Record(defaultOptions) {
  onUndo: (operations: List<Operation>) => void;
  onRedo: (operations: List<Operation>) => void;
}

export default Options;
