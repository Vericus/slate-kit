import styled, { css } from "styled-components";
import listStyles from "./listStyles";

function includeTypography(heading) {
  return css`
    font-size: ${p => p.theme.typography[heading].fontSize};
    font-weight: ${p => p.theme.typography[heading].fontWeight};
    margin-top: ${p => p.theme.typography[heading].marginTop};
    margin-bottom: ${p => p.theme.typography[heading].marginBottom};
  `;
}

const Styled = styled.div`
  .ql-color-label {
    stroke: red;
  }
  .ql-transparent {
    opacity: 0.2;
  }
  .ql-thin {
    stroke-width: 0.5;
  }

  :not(.colored-icon) {
    .ql-stroke {
      stroke: #000;
      fill: transparent;
    }
    .ql-stroke-mitter {
      stroke: #000;
      fill: transparent;
    }
    .ql-fill {
      fill: #000;
    }
    .ql-even {
      stroke: #000;
      fill: #fff;
    }
    .ql-thin {
      stroke: #000;
      fill: transparent;
    }
  }

  .colored-icon {
    .ql-stroke {
      stroke: inherit;
      fill: transparent;
      stroke-width: 2;
    }
    .ql-stroke-mitter {
      stroke: inherit;
      fill: transparent;
      stroke-width: 2;
    }
    .ql-fill {
      fill: inherit;
    }
    .ql-even {
      stroke: inherit;
      fill: inherit;
    }
    .ql-thin {
      stroke: inherit;
      fill: inherit;
      stroke-width: 1;
    }
  }

  .btn-icon--disabled {
    .ql-stroke {
      stroke: rgba(0, 0, 0, 0.23) !important;
    }
    .ql-stroke-mitter {
      stroke: rgba(0, 0, 0, 0.23) !important;
    }
    .ql-fill {
      fill: rgba(0, 0, 0, 0.23) !important;
    }
    .ql-even {
      stroke: rgba(0, 0, 0, 0.23) !important;
      fill: #fff !important;
    }
    .ql-thin {
      stroke: rgba(0, 0, 0, 0.23) !important;
    }
    .ql-color-label {
      stroke: rgba(0, 0, 0, 0.23) !important;
    }
  }

  .btn-icon--active {
    .ql-fill {
      fill: blue;
    }
    .ql-stroke {
      stroke: blue;
      stroke-width: 2;
    }
    .ql-stroke-mitter {
      stroke: blue;
      stroke-width: 2;
    }
    .ql-thin {
      stroke: blue;
      stroke-width: 1;
    }
  }

  .slate-read-only * {
    caret-color: transparent;
    color: transparent;
    text-shadow: 0 0 0 #000;
  }
  .editorContainer {
    padding-top: 100px;
    font-family: ${p => p.fontFamily || p.theme.typography.fontFamily};
    font-size: ${p => p.fontSize || p.theme.typography.fontSize};
    line-height: ${p => p.lineHeight || p.theme.typography.lineHeight};
    color: ${p => p.theme.colors.charcoal};

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    ul,
    ol,
    blockquote,
    dl,
    figcaption,
    .cui-table {
      max-width: 800px;
      min-width: 360px;
      padding-left: ${p => `${p.theme.spacing.gutter}px`};
      padding-right: ${p => `${p.theme.spacing.gutter}px`};
      box-sizing: border-box;
      margin-left: auto;
      margin-right: auto;
      line-height: inherit;
      display: block;
    }

    figcaption {
      text-align: center;
    }

    img {
      display: block;
      vertical-align: middle;
      box-sizing: border-box;
      min-width: 360px;
      width: 100%;
      max-width: 800px;
      object-fit: contain;
      margin-left: auto;
      margin-right: auto;
    }
    img[data-image-is-selected="true"] {
      outline: 1px solid blue;
    }
    img[data-image-width="full"] {
      width: 100%;
      max-width: 100%;
      object-fit: cover;
      max-height: 80vh;
    }
    img[data-image-width="original"] {
      width: auto;
      max-width: 100%;
      object-fit: contain;
    }

    blockquote {
      position: relative;
      font-weight: 500;
      color: gray;
      display: block;
      margin-top: 1em;
      margin-bottom: 1em;
      border-left: solid 3px gray;
    }

    figure {
      margin: 0;
      [data-slate-void] {
        position: relative;
      }
    }

    h1 {
      ${includeTypography("headingOne")};
    }

    h2 {
      ${includeTypography("headingTwo")};
    }

    h3 {
      ${includeTypography("headingThree")};
    }

    h4 {
      ${includeTypography("headingFour")};
    }

    h5 {
      ${includeTypography("headingFive")};
    }

    h6 {
      ${includeTypography("headingSix")};
    }

    p {
      font-size: ${p => p.theme.typography.paragraph.fontSize};
      font-weight: ${p => p.theme.typography.paragraph.fontWeight};
      margin-top: 1em;
      margin-bottom: 1em;
    }

    strong {
      font-weight: ${p => p.theme.typography.fontWeightBold};
    }
    ${listStyles};
  }
`;

export default Styled;
