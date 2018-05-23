// @flow
export default function isWordHTML(html: string) {
  return html
    .toString()
    .match(/(class="?Mso|style="[^"]*\bmso-|w:WordDocument)/gi);
}
