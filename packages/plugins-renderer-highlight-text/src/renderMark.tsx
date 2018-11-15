import * as React from "react";
import Register from "@vericus/slate-kit-utils-register-helpers";
import { Mark } from "slate";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
  className?: string;
}

export default function createRenderMark(marks) {
  const marksRenderer = Object.entries(marks).reduce(
    (renderers, [markName, markType]) => {
      return {
        ...renderers,
        [markName]: (props: Props) => {
          const { attributes, children, className } = props;
          return (
            <span {...attributes} className={className}>
              {children}
            </span>
          );
        }
      };
    },
    {}
  );
  return Register({ marksRenderer });
}
