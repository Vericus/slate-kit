// @flow

const tagTextIndented = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
const tagTextFurtherIndented = ["ul", "ol"];
const basicIndentation = 27;
const extraIndentation = 36;
const tagNames = [...tagTextIndented, ...tagTextFurtherIndented];

export default function getData(el: Element, opts) {
  const { maxIndentation, dataField } = opts;
  const tagName = el.tagName && el.tagName.toLowerCase();
  const classNames = el.className && el.className.split(" ");
  let marginLeft;
  if (!tagName || !tagNames.includes(tagName)) return {};
  if (tagTextFurtherIndented.includes(tagName)) {
    const liEl = el.childNodes[0];
    marginLeft =
      liEl.style &&
      liEl.style.marginLeft &&
      parseInt(liEl.style.marginLeft, 10);
    if (marginLeft) marginLeft += extraIndentation;
  } else {
    marginLeft =
      el.style && el.style.marginLeft && parseInt(el.style.marginLeft, 10);
  }
  let indentLevel = 0;
  if (Array.isArray(classNames)) {
    classNames.forEach(classname => {
      const result = classname.match(/(.*)(indent|level|ul|ol)(.*)(\d+)/);
      const indentation = result && result[4] && parseInt(result[4], 10);
      if (indentation) {
        if (indentation <= maxIndentation) {
          indentLevel = indentation;
        } else {
          indentLevel = maxIndentation;
        }
      }
    });
  }
  if (marginLeft && !indentLevel) {
    const indentation = Math.floor(marginLeft / basicIndentation);
    if (indentation) {
      if (indentation <= maxIndentation) {
        indentLevel = indentation;
      } else {
        indentLevel = maxIndentation;
      }
    }
  }
  if (!indentLevel) return {};
  return {
    data: {
      [dataField]: indentLevel
    }
  };
}
