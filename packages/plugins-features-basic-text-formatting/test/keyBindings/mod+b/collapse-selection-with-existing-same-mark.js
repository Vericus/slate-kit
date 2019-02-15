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
        <cursor marks={[{ type: "bold" }]} />
        rd
      </h1>
      <h1>another</h1>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        wo
        <cursor marks={[]} />
        rd
      </h1>
      <h1>another</h1>
    </document>
  </value>
);
