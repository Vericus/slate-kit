import expect from "expect";
import fs from "fs";
import toCamel from "to-camel-case";
import { basename, extname, resolve } from "path";

import HighlightText from "../../src/index.ts";

const plugin = HighlightText({
  type: "textColor",
  data: "color",
  defaultColor: "transparent",
  styles: ["textDecorationColor", "color"]
});

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
                const fn = module.default;
                const change = input.change();
                fn(change, plugin.changes.changeColor);
                const opts = { preserveSelection: true, preserveData: true };
                const actual = change.value.toJSON(opts);
                const expected = output.toJSON(opts);
                expect(expected).toEqual(actual);
              });
            }
          });
        } else {
          test.concurrent(method, async () => {
            const module = require(resolve(categoryDir, method));
            const { input, output } = module;
            const fn = module.default;
            const change = input.change();
            fn(change, plugin.changes.changeColor);
            const opts = { preserveSelection: true, preserveData: true };
            const actual = change.value.toJSON(opts);
            const expected = output.toJSON(opts);
            expect(expected).toEqual(actual);
          });
        }
      }
    });
  });
});
