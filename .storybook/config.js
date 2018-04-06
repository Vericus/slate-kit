import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

import "../assets/css/storybook.scss";

setOptions({
  name: "Slate-Kit",
  url: "https://github.com/Vericus/slate-kit",
  addonPanelInRight: true,
});
// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
console.log(req);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
