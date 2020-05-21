/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.isItalic();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <b>word</b>
      </paragraph>
      <h1>
        <b>word</b>
        <focus />
      </h1>
    </document>
  </value>
);

export const output = false;
