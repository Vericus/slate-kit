/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function (editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "u",
    ctrlKey: true,
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <h1>
        wo
        <anchor />
        <u>rd</u>
      </h1>
      <h1>
        <focus />
        another
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
        rd
      </h1>
      <h1>
        <focus />
        another
      </h1>
    </document>
  </value>
);
