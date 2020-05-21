/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.isStrikethrough();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <s>word</s>
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = true;
