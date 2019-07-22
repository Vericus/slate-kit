import { rollup } from "@vericus/rollup-config";
var rollupConfig = rollup({
  workspaceRoot: __dirname,
  globals: {}
});
export { rollupConfig as rollup };
