/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.increaseIndent();
}

export const input = (
  <value>
    <document>
      <paragraph indentation={1}>
        word
        <anchor />
      </paragraph>
      <paragraph>
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
        word
        <anchor />
      </paragraph>
      <paragraph indentation={1}>
        another
        <focus />
      </paragraph>
    </document>
  </value>
);
