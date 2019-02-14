/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  return editor.isStrikethrough();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <cursor marks={[{ type: "strikethrough" }]} />
        word
      </paragraph>
    </document>
  </value>
);

export const output = true;
