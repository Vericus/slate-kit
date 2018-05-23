// @flow
export default function cleanHTML(html: string) {
  return html
    .replace(
      /[.\s\S\w\W<>]*<body[^>]*>([.\s\S\w\W<>]*)<\/body>[.\s\S\w\W<>]*/g,
      "$1"
    )
    .replace(/[.\s\S\w\W<>]*<div[^>]*>(.*)<\/div>[.\s\S\w\W<>]*/, "$1");
}
