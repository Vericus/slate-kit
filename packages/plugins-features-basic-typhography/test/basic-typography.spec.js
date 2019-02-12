import { Editor } from "slate";
import expect from "expect";
import { fixtures } from "../../../support/test-helpers";
import Typography from "../src/index";
import Utils from "../../utils/src/index";

const plugins = [Typography(), Utils()];

describe("typography", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {} } = module;
    const fn = module.default;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    editor.setValue(output);
    const outputValue = editor.value.toJSON(opts);
    editor.setValue(input);
    const inputValue = editor.value.toJSON(opts);

    editor.setValue(input);
    fn(editor);
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
