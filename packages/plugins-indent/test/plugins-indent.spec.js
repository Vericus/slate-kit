import { Editor } from "slate";
import expect from "expect";
import Indent from "../src/index";
import { fixtures, testWithHistory } from "../../../support/test-helpers";
import Typography from "../../plugins-features-basic-typhography/src/index";
import Utils from "../../utils/src/index";
import Renderer from "../../plugins-renderer/src/index";
import HTMLSerializer from "../../html-serializer/src/index";

const plugins = [HTMLSerializer(), Renderer(), Typography(), Indent(), Utils()];

describe("indent", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn);
  });
});
