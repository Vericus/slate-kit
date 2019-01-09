/** @jsx h */
import h from "@vericus/slate-kit-utils-hyperscript";

export default function(editor) {
  editor.toggleTypography("heading-one");
}

export const input = (
  <value>
    <document>
      <paragraph>
        <link>
          <anchor />
          word
        </link>
      </paragraph>
      <paragraph>
        <link>
          <focus />
          another
        </link>
      </paragraph>
    </document>
  </value>
);

export const output = (
  <value>
    <document>
      <h1>
        <link>
          <anchor />
          word
        </link>
      </h1>
      <h1>
        <link>
          <focus />
          another
        </link>
      </h1>
    </document>
  </value>
);
