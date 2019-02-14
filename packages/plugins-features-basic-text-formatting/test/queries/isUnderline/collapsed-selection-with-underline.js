/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isUnderline();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <cursor marks={[{ type: "underline" }]} />
        word
      </paragraph>
    </document>
  </value>
);

export const output = true;
