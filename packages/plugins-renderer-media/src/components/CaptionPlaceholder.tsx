import * as React from "react";
import { Props } from "../types";

const CaptionPlaceholder: React.SFC<Props> = props => {
  const { isSelected } = props;
  const innerStyle: React.CSSProperties = {
    position: "absolute",
    whiteSpace: "pre-wrap",
    width: "100%",
    left: 0,
    textIndent: "initial",
    userSelect: "none",
    maxHeight: 180,
    overflow: "hidden"
  };
  return isSelected ? null : (
    <span className="innerPlaceholder" style={innerStyle} data-slate-zero-width>
      Add Caption Here
    </span>
  );
};

export default CaptionPlaceholder;
