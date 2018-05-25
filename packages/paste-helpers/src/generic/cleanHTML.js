// @flow
export default function cleanHTML(html: string) {
  return html.replace(
    /[.\s\S\w\W<>]*<body[^>]*>([.\s\S\w\W<>]*)<\/body>[.\s\S\w\W<>]*/g,
    "$1"
  );
}
