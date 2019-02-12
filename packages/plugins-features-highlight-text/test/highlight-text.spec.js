import { Editor } from "slate";
import expect from "expect";
import { fixtures } from "../../../support/test-helpers";
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
    const { input, output, options = {} } = module;
    const fn = module.default;
    const editor = new Editor({ plugins: backgroundPlugins });
    const opts = { preserveSelection: true, ...options };
    editor.setValue(output);
    const outputValue = editor.value.toJSON(opts);
    editor.setValue(input);
    const inputValue = editor.value.toJSON(opts);

    fn(editor, "Background");
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(outputValue);
    editor.undo();
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(inputValue);
    editor.redo();
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(outputValue);
  });

  fixtures(__dirname, "colored-changes", ({ module }) => {
    const { input, output, options = {} } = module;
    const fn = module.default;
    const editor = new Editor({ plugins: coloredPlugins });
    const opts = { preserveSelection: true, ...options };
    editor.setValue(output);
    const outputValue = editor.value.toJSON(opts);
    editor.setValue(input);
    const inputValue = editor.value.toJSON(opts);

    editor.setValue(input);
    fn(editor, "Text");
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(outputValue);
    editor.undo();
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(inputValue);
    editor.redo();
    editor.flush();
    expect(editor.value.toJSON(opts)).toEqual(outputValue);
  });
});
