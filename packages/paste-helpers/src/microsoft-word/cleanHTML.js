// @flow
import wordFilter from "tinymce-word-paste-filter";

// filter pasted HTML using wordFilter from tinymce to get rid of
// metadata tags that shouldn't be deserialize on pasting
export default function cleanHTML(html: string) {
  return wordFilter(html);
}
