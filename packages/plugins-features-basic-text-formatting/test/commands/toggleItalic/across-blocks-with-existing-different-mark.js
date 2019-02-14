/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleItalic();
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <b>rd</b>
      </h1>
      <h1>
        <b>an</b>
        <focus />
        other
      </h1>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <i>
          <b>rd</b>
        </i>
      </h1>
      <h1>
        <i>
          <b>an</b>
        </i>
        <focus />
        other
      </h1>
    </document>
  </value>
);
