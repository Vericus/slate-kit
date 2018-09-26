import * as React from "react";
import { Mark } from "slate";

export interface Props {
  mark: Mark;
  children: JSX.Element;
  attributes: any;
  className?: string;
}

export default function createRenderMark(type) {
  return {
    marks: {
      [type]: (props: Props) => {
        const { attributes, children, className } = props;
        return (
          <span {...attributes} className={className}>
            {children}
          </span>
        );
      }
    }
  };
}
