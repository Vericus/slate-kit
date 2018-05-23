// @flow
export default function cleanHTML(html: string) {
  return html.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/, "$1");
}
