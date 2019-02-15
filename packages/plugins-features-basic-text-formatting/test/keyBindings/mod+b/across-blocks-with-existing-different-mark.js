/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "b",
    ctrlKey: true
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <i>rd</i>
      </h1>
      <h1>
        <i>an</i>
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
        <b>
          <i>rd</i>
        </b>
      </h1>
      <h1>
        <b>
          <i>an</i>
        </b>
        <focus />
        other
      </h1>
    </document>
  </value>
);
