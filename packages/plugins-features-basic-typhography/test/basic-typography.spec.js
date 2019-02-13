import { Editor } from "slate";
import expect from "expect";
import { fixtures, testWithHistory } from "../../../support/test-helpers";
import Typography from "../src/index";
import Utils from "../../utils/src/index";

const plugins = [Typography(), Utils()];

describe("typography", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn);
  });
});
