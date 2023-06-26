export const extractExcerpt = (body: string) =>
  body
    .match(/^(?!#|!|(?:<[^>]*>|&lt;[^&]*&gt;).*$|\s*$).*/m)?.[0]
    .match(/[^\.!\?]+[\.!\?]+/)?.[0]
