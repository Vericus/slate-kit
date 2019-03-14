import { Editor, Plugin } from "slate";
import genericClean from "./generic";
import wordClean, { isWordHTML } from "./microsoft-word";
import googleDocsClean, { isGoogleDocsHTML } from "./google-docs";

export interface PasteHelperPlugin extends Plugin {
  queries: {
    isWordHTML: (editor: Editor, HTMLstring: string) => boolean;
    isGoogleDocsHTML: (editor: Editor, HTMLstring: string) => boolean;
    cleanedWordHTML: (editor: Editor, HTMLstring: string) => Promise<string>;
    cleanedDocsHTML: (editor: Editor, HTMLstring: string) => Promise<string>;
    cleanedGenericHTML: (editor: Editor, HTMLstring: string) => Promise<string>;
    cleanHTML: (
      editor: Editor,
      HTMLstring: string
    ) => Promise<{ origin: "word" | "docs" | "generic"; cleanedHTML: string }>;
  };
}

export default function PasteHelpers(): PasteHelperPlugin {
  return {
    queries: {
      isWordHTML: (_editor: Editor, html: string) => isWordHTML(html),
      isGoogleDocsHTML: (_editor: Editor, html: string) =>
        isGoogleDocsHTML(html),
      cleanedWordHTML: async (_editor: Editor, html: string) => wordClean(html),
      cleanedDocsHTML: async (_editor: Editor, html: string) =>
        googleDocsClean(html),
      cleanedGenericHTML: async (_editor: Editor, html: string) =>
        genericClean(html),
      cleanHTML: async (editor: Editor, html: string) => {
        let cleanedHTML;
        if (editor.isWordHTML(html)) {
          cleanedHTML = await editor.cleanedWordHTML(html);
          return {
            origin: "word",
            cleanedHTML
          };
        }
        if (editor.isGoogleDocsHTML(html)) {
          cleanedHTML = await editor.cleanedDocsHTML(html);
          return {
            origin: "docs",
            cleanedHTML
          };
        }
        cleanedHTML = await editor.cleanedGenericHTML(html);
        return {
          origin: "generic",
          cleanedHTML
        };
      }
    }
  };
}
