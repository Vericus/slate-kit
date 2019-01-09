/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleTypography("heading-one");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
      </paragraph>
      <paragraph>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        <anchor />
        word
      </h1>
      <paragraph>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);
