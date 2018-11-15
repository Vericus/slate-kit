export default function isGoogleDocsHTML(html: string): boolean {
  return html.indexOf('id="docs-internal-guid') >= 0;
}
