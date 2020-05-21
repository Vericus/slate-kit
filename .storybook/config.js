import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";
import { withOptions } from "@storybook/addon-options";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "./theme";
import Styled from "./Styled";

import normalizeCss from "./normalize";

const GlobalStyle = createGlobalStyle`
body {
  font-size: 16px;
  font-family: Roboto, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smotthing: grayscale;
}

  ${normalizeCss}
`;

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addParameters({
  options: {
    name: "Slate-Kit",
    url: "https://github.com/Vericus/slate-kit",
    panelPosition: "right",
    theme: themes.light,
  },
});

addDecorator((story) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Styled>{story()}</Styled>
    </ThemeProvider>
    <GlobalStyle />
  </React.Fragment>
));

configure(loadStories, module);
