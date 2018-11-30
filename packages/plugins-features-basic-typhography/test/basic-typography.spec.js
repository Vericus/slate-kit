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

    editor.setValue(input);
    fn(editor);
    const actual = editor.value.toJSON(opts);
    editor.setValue(output);
    const expected = editor.value.toJSON(opts);
    expect(expected).toEqual(actual);
  });
});
