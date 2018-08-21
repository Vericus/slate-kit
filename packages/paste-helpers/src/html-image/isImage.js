// @flow
export default function isImage(html: string) {
  return html.indexOf("<img src=") >= 0;
}
