import { Set, List } from "immutable";
import { Mark } from "slate";
import { TextMark, MarkTypes } from "../options";

function getFontStyleMark(marksOption: TextMark, fontStyle): Mark | undefined {
  switch (fontStyle) {
    case "italic":
      return marksOption.italic
        ? new Mark({ type: marksOption.italic })
        : undefined;
    default:
      return undefined;
  }
}

function getTextDecorationMark(
  marksOption: TextMark,
  textDecoration
): Mark | undefined {
  switch (textDecoration) {
    case "underline":
      return marksOption.underline
        ? new Mark({ type: marksOption.underline })
        : undefined;
    case "line-through":
      return marksOption.strikethrough
        ? new Mark({ type: marksOption.strikethrough })
        : undefined;
    default:
      return undefined;
  }
}

function getFontWeightMark(
  marksOption: TextMark,
  fontWeight
): Mark | undefined {
  if (fontWeight === "bold") {
    return marksOption.bold ? new Mark({ type: "bold" }) : undefined;
  } else if (parseInt(fontWeight, 10) > 400) {
    return marksOption.bold ? new Mark({ type: "bold" }) : undefined;
  }
  return undefined;
}

export default function getData(
  marksOption: TextMark,
  el: HTMLElement
): { marks?: List<Mark> } {
  let marks = Set<Mark>();
  const { style } = el;
  if (style) {
    const { fontStyle, textDecoration, fontWeight } = style;
    if (fontStyle) {
      const fontMark = getFontStyleMark(marksOption, fontStyle);
      if (fontMark) marks = marks.add(fontMark);
    }
    if (textDecoration) {
      const decorationMark = getTextDecorationMark(marksOption, textDecoration);
      if (decorationMark) marks = marks.add(decorationMark);
    }
    if (fontWeight) {
      const weightMark = getFontWeightMark(marksOption, fontWeight);
      if (weightMark) marks = marks.add(weightMark);
    }
    return { marks: marks.toList() };
  }
  return {};
}
