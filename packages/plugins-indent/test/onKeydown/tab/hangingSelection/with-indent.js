/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor, createEvent) {
  const keyEvent = createEvent("keydown", {
    key: "tab"
  });
  editor.run("onKeyDown", keyEvent);
}

export const input = (
  <value>
    <document>
      <paragraph indentation={7}>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={7}>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <paragraph indentation={8}>
        <anchor />
        word
      </paragraph>
      <paragraph indentation={7}>
        <focus />
        another
      </paragraph>
    </document>
  </value>
);
