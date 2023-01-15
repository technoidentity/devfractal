import { bundleMDX } from 'mdx-bundler'
import rehypeHighlight from 'rehype-highlight'

// import path from 'path'

// if (process.platform === 'win32') {
//   process.env.ESBUILD_BINARY_PATH = path.join(
//     process.cwd(),
//     'node_modules',
//     'esbuild',
//     'esbuild.exe',
//   )
// } else {
//   process.env.ESBUILD_BINARY_PATH = path.join(
//     process.cwd(),
//     'node_modules',
//     'esbuild',
//     'bin',
//     'esbuild',
//   )
// }

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
