/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, name) {
  editor[`change${name}Color`]("red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />
        word
        <focus />
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <color color="red">word</color>
        <focus />
      </paragraph>
    </document>
  </value>
);
