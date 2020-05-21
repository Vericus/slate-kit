import { Editor, Block } from "slate";
import expect from "expect";
import { fixtures, testWithHistory } from "../../../support/test-helpers";
import Typography from "../src/index";
import Utils from "../../utils/src/index";
import Renderer from "../../plugins-renderer/src/index";
import HTMLSerializer from "../../html-serializer/src/index";

const plugins = [HTMLSerializer(), Renderer(), Typography(), Utils()];

describe("typography", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn);
  });

  fixtures(__dirname, "queries", ({ module }) => {
    const { input, output, default: fn } = module;
    const editor = new Editor({ value: input, plugins });
    expect(output).toEqual(fn(editor));
  });

  fixtures(__dirname, "schemas", ({ module }) => {
    const { input, output } = module;
    const editor = new Editor({ value: input, plugins });
    const actual = editor.value.toJSON();
    editor.setValue(output);
    const expected = editor.value.toJSON();
    expect(expected).toEqual(actual);
  });

  fixtures(__dirname, "rules", ({ module }) => {
    const { input, output, default: fn } = module;
    const editor = new Editor({ plugins });
    expect(output.toJSON()).toEqual(fn(editor, input).toJSON());
  });

  describe("queries", () => {
    describe("getDefaultBlock", () => {
      it("on-any-range", () => {
        /* eslint-disable array-callback-return */
        ["paragraph", "heading-one", "heading-two", "heading-three"].map(
          (type) => {
            const testPlugins = [
              Renderer(),
              Typography({ defaultBlock: type }),
              Utils(),
            ];
            const editor = new Editor({ plugins: testPlugins });
            expect(editor.getDefaultBlock()).toEqual(type);
          }
        );
        /* eslint-enable */
      });
    });
  });

  describe("queries", () => {
    describe("isTypography", () => {
      it("on-any-range", () => {
        const testPlugins = [Renderer(), Typography(), Utils()];
        const editor = new Editor({ plugins: testPlugins });
        ["paragraph", "heading-one", "heading-two", "heading-three"].forEach(
          (type) => {
            const block = Block.create({
              type,
            });
            expect(editor.isTypography(block)).toEqual(true);
          }
        );
        ["ol-list", "ul-list"].forEach((type) => {
          const block = Block.create({
            type,
          });
          expect(editor.isTypography(block)).toEqual(false);
        });
      });
    });
  });
});
