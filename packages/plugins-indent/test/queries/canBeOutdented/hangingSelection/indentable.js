/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.canBeOutdented();
}

export const input = (
  <value>
    <document>
      <paragraph indentation={1}>
        <anchor />
        <b>word</b>
      </paragraph>
      <paragraph>
        <focus />
        <b>word</b>
      </paragraph>
    </document>
  </value>
);

export const output = true;
