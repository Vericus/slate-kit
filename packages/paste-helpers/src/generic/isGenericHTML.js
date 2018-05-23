// @flow
export default function isGenericHTML(html: string) {
  return html.indexOf("<body>") >= 0;
}
