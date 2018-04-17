// @flow
import { Record } from "immutable";
import type { Change } from "slate";

export type typeOptions = {
  onUndo?: ?(change: Change) => void,
  onRedo?: ?(change: Change) => void
};

const defaultOptions: typeOptions = {
  onUndo: undefined,
  onRedo: undefined
};

class Options extends Record(defaultOptions) {
  onUndo: ?(change: Change) => void;
  onRedo: ?(change: Change) => void;
}

export default Options;
