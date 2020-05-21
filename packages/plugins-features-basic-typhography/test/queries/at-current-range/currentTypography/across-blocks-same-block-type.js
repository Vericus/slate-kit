/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.currentTypography();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
      </paragraph>
      <paragraph>
        word
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = "paragraph";
