import { Editor } from "slate";
import HTML from "slate-html-serializer";

function HTMLSerializer() {
  let rules: any[] = [];
  let serializers = new HTML();
  let dataGetter: any[] = [];

  return {
    onConstruct: (editor: Editor, next) => {
      const defaultRules = [
        {
          deserialize(el, next) {
            if (el.tagName.toLowerCase() !== "div") return undefined;
            if (!el.textContent || (el.textContent && el.textContent !== "")) {
              return undefined;
            }
            const { data, marks } = editor.getData(el);
            return {
              object: "block",
              data,
              marks,
              type: "paragraph",
              nodes: next(el.childNodes)
            };
          }
        },
        {
          deserialize(el, next) {
            if (
              el.parentNode &&
              el.parentNode.parentNode &&
              el.parentNode.parentNode.tagName.toLowerCase() === "div"
            ) {
              return undefined;
            }
            if (el.parentNode && el.parentNode.tagName.toLowerCase() === "li") {
              return undefined;
            }
            if (el.nodeName === "#text") return undefined;
            if (
              el.firstChild &&
              el.firstChild.nodeName !== "#text" &&
              el.firstChild.firstChild &&
              el.firstChild.firstChild.nodeName !== "#text"
            ) {
              return undefined;
            }
            if (el.firstChild && el.firstChild.nodeName === "#text") {
              return undefined;
            }
            if (!el.textContent || (el.textContent && el.textContent !== "")) {
              return undefined;
            }
            const { data, marks } = editor.getData(el);
            return {
              object: "block",
              data,
              marks,
              type: "paragraph",
              nodes: next(el.childNodes)
            };
          }
        }
      ];
      if (editor.registerHTMLRule) {
        editor.registerHTMLRule(defaultRules);
      }
      return next();
    },
    queries: {
      registerHTMLRule: (editor: Editor, newRules) => {
        if (Array.isArray(newRules)) {
          rules = [...rules, ...newRules];
        } else {
          rules = [...rules, newRules];
        }
        serializers = new HTML({ rules });
      },
      registerDataGetter: (_editor: Editor, getter) => {
        dataGetter = [...dataGetter, getter];
      },
      getData: (_editor: Editor, element) =>
        dataGetter.reduce((memo, getter) => {
          const passData = getter(element);
          const marks = [
            ...(memo.marks ? memo.marks : []),
            ...(passData.mark ? [passData.mark] : [])
          ];
          return {
            ...memo,
            ...passData,
            marks
          };
        }, {}),
      getHTMLSerializer: (_editor: Editor) => serializers,
      deserializeHTML: (_editor: Editor, html) => serializers.deserialize(html)
    }
  };
}

export default HTMLSerializer;
