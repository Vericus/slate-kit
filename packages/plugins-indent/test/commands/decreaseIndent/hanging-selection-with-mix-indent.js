/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.decreaseIndent();
}

export const input = (
  <value>
    <document>
      <paragraph indentation={1}>
        word
        <anchor />
      </paragraph>
      <paragraph indentation={4}>another</paragraph>
      <paragraph indentation={2}>
        one
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
      <paragraph indentation={3}>another</paragraph>
      <paragraph indentation={1}>
        one
        <focus />
      </paragraph>
    </document>
  </value>
);
