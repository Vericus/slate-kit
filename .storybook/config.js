import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import { ThemeProvider, injectGlobal } from "styled-components";
import theme from "./theme";
import Styled from "./Styled";

import normalizeCss from "./normalize";

injectGlobal`
body {
  font-size: 16px;
  font-family: Roboto, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smotthing: grayscale;
}

  ${normalizeCss}
`;

setOptions({
  name: "Slate-Kit",
  url: "https://github.com/Vericus/slate-kit",
  addonPanelInRight: true
});

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Styled>{story()}</Styled>
  </ThemeProvider>
));

configure(loadStories, module);
