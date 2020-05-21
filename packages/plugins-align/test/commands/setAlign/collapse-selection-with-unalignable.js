/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor) {
  editor.setAlign("right");
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <i>rd</i>
      </h1>
      <ol>
        <i>an</i>
        <cursor />
        other
      </ol>
      <paragraph />
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <i>rd</i>
      </h1>
      <ol>
        <i>an</i>
        <cursor />
        other
      </ol>
      <paragraph />
    </document>
  </value>
);
