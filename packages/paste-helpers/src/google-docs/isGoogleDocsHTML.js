// @flow
export default function isGoogleDocsHTML(html: string) {
  return html.indexOf('id="docs-internal-guid') >= 0;
}
