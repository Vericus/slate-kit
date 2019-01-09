/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleTypography("heading-one");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <cursor />
        word
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        <cursor />
        word
      </h1>
    </document>
  </value>
);
