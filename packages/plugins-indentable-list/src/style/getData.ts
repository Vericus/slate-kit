export default function getData(el, opts) {
  const { checkField } = opts;
  const tagName = el.tagName && el.tagName.toLowerCase();
  const classNames =
    (el.className &&
      typeof el.className === "string" &&
      el.className.split(" ")) ||
    "";
  if (tagName !== "ul") return {};
  if (
    Array.isArray(classNames) &&
    classNames.some((className) => /(checked|list-taskdone)/i.test(className))
  ) {
    return {
      data: {
        [checkField]: true,
      },
    };
  }
  return {};
}
