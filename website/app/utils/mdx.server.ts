import { bundleMDX } from 'mdx-bundler'
import rehypeHighlight from 'rehype-highlight'

export async function toHtml(data: string) {
  const mdx = await bundleMDX({
    source: data,
    mdxOptions(options, frontmatter) {
      //   options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
      ]

      return options
    },
  })

  return mdx.code
}
