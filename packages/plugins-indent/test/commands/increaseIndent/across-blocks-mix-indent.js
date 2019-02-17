/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.increaseIndent();
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={3}>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={1}>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={4}>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);
