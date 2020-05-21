import * as React from "react";
import Register from "@vericus/slate-kit-utils-register-helpers";
import { Mark, Plugin } from "slate";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
  className?: string;
}

export default function createRenderMark(options): Plugin {
  const { marks } = options;
  const marksRenderer = Object.entries(marks).reduce(
    (renderers, [markName, _markType]) => {
      return {
        ...renderers,
        // eslint-disable-next-line react/display-name
        [markName]: (props: Props) => {
          const { attributes, children, className } = props;
          return (
            <span {...attributes} className={className}>
              {children}
            </span>
          );
        },
      };
    },
    {}
  );
  return Register({ marksRenderer });
}
