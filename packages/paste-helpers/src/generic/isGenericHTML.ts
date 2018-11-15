export default function isGenericHTML(html: string): boolean {
  return html.indexOf("<body>") >= 0;
}
