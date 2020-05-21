/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, name) {
  editor[`change${name}Color`]("#FF00FF").insertText("a");
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
      <paragraph>
        <color color="#FF00FF">a</color>
        <cursor />
        word
      </paragraph>
    </document>
  </value>
);
