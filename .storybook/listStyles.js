import { css } from "styled-components";

const ordered = ["decimal", "lower-alpha", "lower-roman"];
const unordered = [`"\\25CF"`, `"\\25CB"`, `"\\25A0"`];

function nthOfType(array, n) {
  return array[n % array.length];
}

function includeIndentation(indentationLevel) {
  return css`
    padding-left: ${p =>
      `calc(${p.theme.spacing.unit * 3 * indentationLevel}px + ${
        p.theme.spacing.gutter
      }px)`};
  `;
}

function includeListStyle(indentationLevel) {
  return css`
    ${`ol.list-reset-${indentationLevel}`} {
      counter-reset: ${`ol-${indentationLevel} var(--start-at, 1)`};
    }
    ${`ul.indented.indentation-${indentationLevel} > li`}, ${`ol.indented.indentation-${indentationLevel} > li`} {
      padding-left: ${p =>
        `calc(${p.theme.spacing.unit * 3 * indentationLevel}px + 1.5em)`};
    }
    ${`ol.indentation-${indentationLevel}`} > li:before {
      content: ${`counter(ol-${indentationLevel}, ${nthOfType(
        ordered,
        indentationLevel
      )}) ". "`};
    }
    ${`ol.indentation-${indentationLevel}`} > li:after {
      counter-increment: ${`ol-${indentationLevel}`};
      content: "";
    }
    ${`ul.indentation-${indentationLevel}`}:not(.checkList) > li:before {
      content: ${nthOfType(unordered, indentationLevel)};
    }
  `;
}

export default css`
  ol,
  ul {
    margin-top: 0;
    margin-bottom: 0;
    list-style-type: none;
    line-height: initial;
    padding-left: 45px;
  }

  ul > li,
  ol > li {
    position: relative;
    padding-left: 2em;
  }

  ol > li {
    text-indent: -2em;
  }

  ul > li {
    text-indent: -2.125em;
  }

  ul.checkList > li {
    text-indent: -2em;
  }

  ul > li > span,
  ol > li > span {
    line-height: ${p => p.lineHeight || p.theme.typography.lineHeight};
  }

  ul > li:before,
  ol > li:before {
    font-size: 1em;
    user-select: text;
    text-align: right;
    display: inline-block;
    width: 1em;
    cursor: text;
  }

  ol.list-reset:not(.indented) {
    counter-reset: ${`ol var(--start-at, 1)`};
  }

  ul > li:after {
    counter-increment: ul;
    content: '';
  }

  ol > li:after {
    counter-increment: ol;
    content: '';
  }

  ol > li:before {
    margin-right: 1em;
    content: counter(ol, ${nthOfType(ordered, 0)}) ". ";
  }

  ul > li:before {
    content: ${nthOfType(unordered, 0)};
    margin-right: 1.475em;
    font-size: 0.875em;
  }

  ul.checkList {
    line-height: initial;
  }

  ul.checkList > li:before {
    cursor: pointer;
    font-size: 1em;
    display: inline-block;
    margin-right: 1em;
    width: 1em;
    background-repeat: no-repeat;
    content: ' ';
    text-align: right;
    background-size: 1em 1em;
    background-position: right;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPGRlZnM+CiAgICA8cmVjdCBpZD0idW5jaGVja2VkLWIiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgeD0iMSIgeT0iMSIgcng9IjEiLz4KICAgIDxmaWx0ZXIgaWQ9InVuY2hlY2tlZC1hIiB3aWR0aD0iMTc4LjYlIiBoZWlnaHQ9IjE3OC42JSIgeD0iLTM5LjMlIiB5PSItMzIuMSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICA8ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggaW49InNoYWRvd0JsdXJPdXRlcjEiIHJlc3VsdD0ic2hhZG93TWF0cml4T3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC41NCAwIi8+CiAgICAgIDxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIyIi8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIyIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjIiIHN0ZERldmlhdGlvbj0iMSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMiIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjIiIHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjE4IDAiLz4KICAgICAgPGZlTWVyZ2U+CiAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSJzaGFkb3dNYXRyaXhPdXRlcjEiLz4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMiIvPgogICAgICA8L2ZlTWVyZ2U+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDx1c2UgZmlsbD0iIzAwMCIgZmlsdGVyPSJ1cmwoI3VuY2hlY2tlZC1hKSIgeGxpbms6aHJlZj0iI3VuY2hlY2tlZC1iIi8+CiAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiN1bmNoZWNrZWQtYiIvPgogIDwvZz4KPC9zdmc+Cg==);
  }

  .checkList.checked {
    text-decoration: line-through;
    color: ${p => p.theme.colors.shadows[36]}
  }

  .checkList.checked > li:before {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPGRlZnM+CiAgICA8cmVjdCBpZD0iY2hlY2tlZC1iIiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHg9IjEiIHk9IjEiIHJ4PSIxIi8+CiAgICA8ZmlsdGVyIGlkPSJjaGVja2VkLWEiIHdpZHRoPSIxNzguNiUiIGhlaWdodD0iMTc4LjYlIiB4PSItMzkuMyUiIHk9Ii0zMi4xJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgPGZlT2Zmc2V0IGR5PSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIHN0ZERldmlhdGlvbj0iMSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCBpbj0ic2hhZG93Qmx1ck91dGVyMSIgcmVzdWx0PSJzaGFkb3dNYXRyaXhPdXRlcjEiIHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjM2IDAiLz4KICAgICAgPGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjIiLz4KICAgICAgPGZlR2F1c3NpYW5CbHVyIGluPSJzaGFkb3dPZmZzZXRPdXRlcjIiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMiIgc3RkRGV2aWF0aW9uPSIxIi8+CiAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIyIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMiIgdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMDkgMCIvPgogICAgICA8ZmVNZXJnZT4KICAgICAgICA8ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPgogICAgICAgIDxmZU1lcmdlTm9kZSBpbj0ic2hhZG93TWF0cml4T3V0ZXIyIi8+CiAgICAgIDwvZmVNZXJnZT4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSIjRkRGREZGIiBvcGFjaXR5PSIuNTQiIHJ4PSIyIi8+CiAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNjaGVja2VkLWEpIiB4bGluazpocmVmPSIjY2hlY2tlZC1iIi8+CiAgICA8dXNlIGZpbGw9IiMyODJBMzAiIHhsaW5rOmhyZWY9IiNjaGVja2VkLWIiLz4KICAgIDxwb2x5Z29uIGZpbGw9IiNGREZERkYiIHBvaW50cz0iNi41MzUgOS4wNjUgNC40OCA3LjM0IDMgOC44MDggNi41MzUgMTIgMTMgNS40NjggMTEuNTIgNCIvPgogIDwvZz4KPC9zdmc+Cg==);
  }

  .indentation-1:not(ul):not(ol) {
    ${includeIndentation(1)};
  }

  .indentation-2:not(ul):not(ol) {
    ${includeIndentation(2)};
  }

  .indentation-3:not(ul):not(ol) {
    ${includeIndentation(3)};
  }

  .indentation-4:not(ul):not(ol) {
    ${includeIndentation(4)};
  }

  .indentation-5:not(ul):not(ol) {
    ${includeIndentation(5)};
  }

  .indentation-6:not(ul):not(ol) {
    ${includeIndentation(6)};
  }

  .indentation-7:not(ul):not(ol) {
    ${includeIndentation(7)};
  }

  .indentation-8:not(ul):not(ol) {
    ${includeIndentation(8)};
  }

  ${includeListStyle(1)}
  ${includeListStyle(2)}
  ${includeListStyle(3)}
  ${includeListStyle(4)}
  ${includeListStyle(5)}
  ${includeListStyle(6)}
  ${includeListStyle(7)}
  ${includeListStyle(8)}
    `;
