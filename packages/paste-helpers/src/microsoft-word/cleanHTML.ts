// filter pasted HTML using wordFilter from tinymce to get rid of
// metadata tags that shouldn't be deserialize on pasting
export default async function cleanHTML(html: string): Promise<string> {
  return import("tinymce-word-paste-filter").then(wordFilter => {
    return wordFilter(html);
  });
}
