/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isStrikethrough();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <s>word</s>
      </paragraph>
      <h1>
        <s>word</s>
        <focus />
      </h1>
    </document>
  </value>
);

export const output = true;
