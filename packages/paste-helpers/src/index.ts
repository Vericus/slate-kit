import { Editor } from "slate";
import genericClean from "./generic";
import wordClean, { isWordHTML } from "./microsoft-word";
import googleDocsClean, { isGoogleDocsHTML } from "./google-docs";

export interface PasteHelperPlugin {
  queries: {
    isWordHTML: (editor: Editor, HTMLstring: string) => boolean;
    isGoogleDocsHTML: (editor: Editor, HTMLstring: string) => boolean;
    cleanedWordHTML: (editor: Editor, HTMLstring: string) => string;
    cleanedDocsHTML: (editor: Editor, HTMLstring: string) => string;
    cleanedGenericHTML: (editor: Editor, HTMLstring: string) => string;
    cleanHTML: (
      editor: Editor,
      HTMLstring: string
    ) => { origin: "word" | "docs" | "generic"; cleanedHTML: string };
  };
}

export default function PasteHelpers(): PasteHelperPlugin {
  return {
    queries: {
      isWordHTML: (_editor: Editor, html: string) => isWordHTML(html),
      isGoogleDocsHTML: (_editor: Editor, html: string) =>
        isGoogleDocsHTML(html),
      cleanedWordHTML: (_editor: Editor, html: string) => wordClean(html),
      cleanedDocsHTML: (_editor: Editor, html: string) => googleDocsClean(html),
      cleanedGenericHTML: (_editor: Editor, html: string) => genericClean(html),
      cleanHTML: (editor: Editor, html: string) => {
        if (editor.isWordHtml(html)) {
          return { origin: "word", cleanedHTML: editor.cleanedWordHTML(html) };
        } else if (editor.isGoogleDocsHTML(html)) {
          return { origin: "docs", cleanedHTML: editor.cleanedDocsHTML(html) };
        }
        return {
          origin: "generic",
          cleanedHTML: editor.cleanedGenericHTML(html)
        };
      }
    }
  };
}
