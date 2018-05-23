// @flow
import wordFilter from "tinymce-word-paste-filter";

export default function cleanHTML(html: string) {
  return wordFilter(html);
}
