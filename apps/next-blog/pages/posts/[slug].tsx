/* eslint-disable @typescript-eslint/naming-convention */
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getPostFromSlug, getSlugs, PostMeta } from '../../src/api'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Youtube from '../../components/Youtube'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'

interface MdxPost {
  source: MDXRemoteSerializeResult
  meta: PostMeta
}

// eslint-disable-next-line import/no-default-export
export default function PostPage({ post }: { post: MdxPost }) {
  return (
    <>
      <Head>
        <title>{post.meta.slug}</title>
      </Head>
      <h1>{post.meta.title}</h1>
      <MDXRemote {...post.source} components={{ Youtube, Image }} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const { content, meta } = getPostFromSlug(slug)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        rehypeHighlight,
      ],
    },
  })

  return {
    props: { post: { source: mdxSource, meta } },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getSlugs().map(slug => ({ params: { slug } }))

  return { paths, fallback: false }
}
