import { Editor, Block } from "slate";
import expect from "expect";
import { fixtures, testWithHistory } from "../../../support/test-helpers";
import Typography from "../src/index";
import Utils from "../../utils/src/index";
import Renderer from "../../plugins-renderer/src/index";

const plugins = [Typography(), Utils()];

describe("typography", () => {
  fixtures(__dirname, "commands", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn);
  });

  fixtures(__dirname, "queries", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    editor.setValue(input);
    const opts = { preserveSelection: true, ...options };
    expect(output).toEqual(fn(editor));
  });

  describe("queries", () => {
    describe("getDefaultBlock", () => {
      it("on-any-range", () => {
        ["paragraph", "heading-one", "heading-two", "heading-three"].map(
          type => {
            const plugins = [
              Renderer(),
              Typography({ defaultBlock: type }),
              Utils()
            ];
            const editor = new Editor({ plugins });
            expect(editor.getDefaultBlock()).toEqual(type);
          }
        );
      });
    });
  });

  describe("queries", () => {
    describe("isTypography", () => {
      it("on-any-range", () => {
        const plugins = [Renderer(), Typography(), Utils()];
        const editor = new Editor({ plugins });
        ["paragraph", "heading-one", "heading-two", "heading-three"].forEach(
          type => {
            const block = Block.create({
              type
            });
            expect(editor.isTypography(block)).toEqual(true);
          }
        );
        ["ol-list", "ul-list"].forEach(type => {
          const block = Block.create({
            type
          });
          expect(editor.isTypography(block)).toEqual(false);
        });
      });
    });
  });
});
