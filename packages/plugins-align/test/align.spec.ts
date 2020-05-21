import { Editor } from "slate";
// import expect from "expect";
import {
  fixtures,
  testWithHistory,
  // createEvent
} from "../../../support/test-helpers";
import Align from "../src/index";
import List from "../../plugins-indentable-list/src/index";
import Typography from "../../plugins-features-basic-typhography/src/index";
import Utils from "../../utils/src/index";
import Renderer from "../../plugins-renderer/src/index";
import HTMLSerializer from "../../html-serializer/src/index";

const plugins = [
  HTMLSerializer(),
  Renderer(),
  Typography(),
  Utils(),
  List(),
  Align(),
];

describe("align", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn);
  });
});
