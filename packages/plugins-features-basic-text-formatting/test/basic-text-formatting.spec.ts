import { Editor } from "slate";
import expect from "expect";
import {
  fixtures,
  testWithHistory,
  createEvent,
} from "../../../support/test-helpers";
import TextFormatting from "../src/index";
import Utils from "../../utils/src/index";
import Renderer from "../../plugins-renderer/src/index";
import HTMLSerializer from "../../html-serializer/src/index";

const plugins = [HTMLSerializer(), Renderer(), TextFormatting(), Utils()];

describe("text formatting", () => {
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

  fixtures(__dirname, "keyBindings", ({ module }) => {
    const { input, output, options = {}, default: fn } = module;
    const editor = new Editor({ plugins });
    const opts = { preserveSelection: true, ...options };
    testWithHistory(input, output, editor, opts, fn, createEvent);
  });

  fixtures(__dirname, "rules", ({ module }) => {
    const { input, output, default: fn } = module;
    const editor = new Editor({ plugins });
    expect(output.toJSON()).toEqual(fn(editor, input).toJSON());
  });
});
