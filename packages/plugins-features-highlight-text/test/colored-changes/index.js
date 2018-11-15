import expect from "expect";
import fs from "fs";
import toCamel from "to-camel-case";
import { basename, extname, resolve } from "path";
import { Editor } from "slate";

import HighlightText from "../../src/index.ts";
import Utils from "../../../utils/src/index.ts";

const name = "Text";

const plugins = [
  HighlightText({
    type: "textColor",
    data: "color",
    defaultColor: "transparent",
    styles: ["textDecorationColor", "color"],
    name
  }),
  Utils()
];

describe("changes", () => {
  const dir = resolve(__dirname);
  const categories = fs
    .readdirSync(dir)
    .filter(c => c[0] !== "." && c !== "index.js");

  categories.forEach(category => {
    describe(category, () => {
      const categoryDir = resolve(dir, category);
      const methods = fs.readdirSync(categoryDir).filter(c => c[0] !== ".");
      for (const method of methods) {
        const testDir = resolve(categoryDir, method);
        const testDirStats = fs.lstatSync(testDir);
        if (testDirStats.isDirectory()) {
          describe(toCamel(method), () => {
            const tests = fs
              .readdirSync(testDir)
              .filter(t => t[0] !== "." && !!~t.indexOf(".js"))
              .map(t => basename(t, extname(t)));
            for (const test of tests) {
              test.concurrent(test, async () => {
                const module = require(resolve(testDir, test));
                const { input, output } = module;
                const editor = new Editor({ plugins });
                const fn = module.default;
                editor.setValue(input);
                fn(editor, name);
                const opts = { preserveSelection: true };
                const actual = editor.value.toJSON(opts);
                const expected = output.toJSON(opts);
                expect(expected).toEqual(actual);
              });
            }
          });
        } else {
          test.concurrent(method, async () => {
            const module = require(resolve(categoryDir, method));
            const { input, output } = module;
            const editor = new Editor({ plugins });
            const fn = module.default;
            editor.setValue(input);
            fn(editor, name);
            const opts = { preserveSelection: true };
            const actual = editor.value.toJSON(opts);
            const expected = output.toJSON(opts);
            expect(expected).toEqual(actual);
          });
        }
      }
    });
  });
});
