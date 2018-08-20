import { Record } from "immutable";
import { Change } from "slate";

export interface TypeOptions {
  onUndo?: (change: Change) => void;
  onRedo?: (change: Change) => void;
}

const defaultOptions: TypeOptions = {
  onUndo: undefined,
  onRedo: undefined
};

class Options extends Record(defaultOptions) {
  onUndo: (change: Change) => void;
  onRedo: (change: Change) => void;
}

export default Options;
