import { Editor } from "slate";
import expect from "expect";
import { fixtures, testWithHistory } from "../../../support/test-helpers";
import HighlightText from "../src/index";
import Utils from "../../utils/src/index";

const backgroundPlugins = [
  HighlightText({
    type: "textBackground",
    alpha: 0.4,
    data: "backgroundColor",
    defaultColor: "black",
    styles: ["backgroundColor"],
    name: "Background"
  }),
  Utils()
];

const coloredPlugins = [
  HighlightText({
    type: "textColor",
    data: "color",
    defaultColor: "transparent",
    styles: ["textDecorationColor", "color"],
    name: "Text"
  }),
  Utils()
];

describe("highlight text", () => {
  fixtures(__dirname, "background-changes", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins: backgroundPlugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn, "Background");
  });

  fixtures(__dirname, "colored-changes", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins: coloredPlugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn, "Text");
  });
});
