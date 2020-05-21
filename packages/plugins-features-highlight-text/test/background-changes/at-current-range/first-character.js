/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, name) {
  editor[`change${name}Color`]("red");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <anchor />w<focus />
        ord
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph>
        <anchor />
        <highlight backgroundColor="red">w</highlight>
        <focus />
        ord
      </paragraph>
    </document>
  </value>
);
