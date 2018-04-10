// @flow
import { Mark, Data, type Change } from "slate";
import tinycolor from "tinycolor2";

function hasMark(value, type) {
  return value.marks && value.marks.some(mark => mark.type === type);
}

function removeColapsedMark(value, change, type) {
  return (
    value.marks &&
    value.marks
      .filter(mark => mark.type === type)
      .forEach(mark => change.removeMark(mark))
  );
}

function removeExpandedMark(document, selection, change, type) {
  return document
    .getMarksAtRange(selection)
    .filter(mark => mark.type === type)
    .forEach(mark => change.removeMarkAtRange(selection, mark));
}

export default function changeColor(
  change: Change,
  color: string,
  type: string,
  dataField: string,
  defaultColor: string
): Change {
  const { value } = change;
  const { selection, document } = value;
  if (hasMark(value, type)) {
    if (tinycolor(color).toName() === defaultColor) {
      if (selection.isCollapsed) {
        removeColapsedMark(value, change, type);
      } else {
        removeExpandedMark(document, selection, change, type);
      }
    } else {
      const newMark = new Mark({
        type,
        data: Data.create({
          [dataField]: color
        })
      });
      if (selection.isCollapsed) {
        removeColapsedMark(value, change, type);
        change.focus();
        change.addMark(newMark);
      } else {
        removeExpandedMark(document, selection, change, type);
        change.addMarkAtRange(selection, newMark);
      }
    }
  } else if (tinycolor(color).toName() !== defaultColor) {
    const mark = new Mark({
      type,
      data: Data.create({
        [dataField]: color
      })
    });
    if (selection.isCollapsed) {
      change.addMark(mark);
    } else {
      removeExpandedMark(document, selection, change, type);
      change.addMarkAtRange(selection, mark);
    }
  }
  change.focus();
  return change;
}
