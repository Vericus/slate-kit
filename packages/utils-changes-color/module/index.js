function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

import { Mark, Data } from "slate";
import tinycolor from "tinycolor2";

function hasMark(value, type) {
  return (
    value.marks &&
    value.marks.some(function(mark) {
      return mark.type === type;
    })
  );
}

function removeColapsedMark(value, change, type) {
  return (
    value.marks &&
    value.marks
      .filter(function(mark) {
        return mark.type === type;
      })
      .forEach(function(mark) {
        return change.removeMark(mark);
      })
  );
}

function removeExpandedMark(document, selection, change, type) {
  return document
    .getMarksAtRange(selection)
    .filter(function(mark) {
      return mark.type === type;
    })
    .forEach(function(mark) {
      return change.removeMarkAtRange(selection, mark);
    });
}

export default function changeColor(
  change,
  color,
  type,
  dataField,
  defaultColor
) {
  var value = change.value;
  var selection = value.selection,
    document = value.document;

  if (hasMark(value, type)) {
    if (tinycolor(color).toName() === defaultColor) {
      if (selection.isCollapsed) {
        removeColapsedMark(value, change, type);
      } else {
        removeExpandedMark(document, selection, change, type);
      }
    } else {
      var newMark = new Mark({
        type: type,
        data: Data.create(_defineProperty({}, dataField, color))
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
    var mark = new Mark({
      type: type,
      data: Data.create(_defineProperty({}, dataField, color))
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
