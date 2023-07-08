import { marked } from 'marked'
import { markedSmartypants } from 'marked-smartypants'

export const parser = ({
  text,
  inline,
}: {
  text: string
  inline?: boolean
}) => {
  marked.use(markedSmartypants())

  if (inline) {
    return marked.parseInline(text, { mangle: false, headerIds: false })
  }
  return marked.parse(text, { mangle: false, headerIds: false })
}
