import { globSync as sync } from 'glob'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export interface PostMeta {
  excerpt: string
  slug: string
  title: string
  tags: string[]
  date: string
}

// interface Post {
//   content: string
//   meta: PostMeta
// }

// eslint-disable-next-line @typescript-eslint/naming-convention
const post_paths = path.join(process.cwd(), 'posts')

export const getSlugs = (): string[] => {
  const paths = sync(`${post_paths}/*.mdx`)

  return paths.map((path: string) => {
    const slugs = path.split('/')
    const fileName = slugs[slugs.length - 1]
    const [slug, _ext] = fileName.split('.')
    return slug
  })
}

export const getPostFromSlug = (slug: string) => {
  const postPath = path.join(post_paths, `${slug}.mdx`)
  const source = fs.readFileSync(postPath)
  const { content, data } = matter(source)

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      title: data.title,
      date: (data.date ?? new Date()).toString(),
    },
  }
}

export const getAllPosts = () => {
  const posts = getSlugs().map(slug => getPostFromSlug(slug))
  return posts
}
