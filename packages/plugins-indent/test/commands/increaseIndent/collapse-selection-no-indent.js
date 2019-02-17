/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.increaseIndent();
}

export const input = (
  <value>
    <document>
      <paragraph>
        word
        <cursor />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={1}>
        word
        <cursor />
      </paragraph>
    </document>
  </value>
);
