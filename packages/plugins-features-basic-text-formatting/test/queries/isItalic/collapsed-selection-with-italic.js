/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  return editor.isItalic();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <cursor marks={[{ type: "italic" }]} />
        word
      </paragraph>
    </document>
  </value>
);

export const output = true;
