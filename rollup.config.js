// eslint-disable-next-line
import { rollup } from "@vericus/rollup-config";

const rollupConfig = rollup({
  workspaceRoot: __dirname,
  globals: {}
});

export { rollupConfig as rollup };
