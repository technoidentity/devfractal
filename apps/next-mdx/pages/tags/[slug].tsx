import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { Articles } from '../../components/Articles'
import { getAllPosts, PostMeta } from '../../src/api'

// eslint-disable-next-line import/no-default-export
export default function TagPage({
  slug,
  posts,
}: {
  slug: string
  posts: PostMeta[]
}) {
  return (
    <>
      <Head>
        <title>Tag:{slug}</title>
      </Head>
      <h1>Tag:{slug}</h1>
      <Articles posts={posts} />
    </>
  )
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const { slug } = params as { slug: string }
  const posts = getAllPosts().filter(post => post.meta.tags.includes(slug))
  return {
    props: {
      slug,
      posts: posts.map(post => post.meta),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const posts = getAllPosts()
  const tags = new Set(posts.map(post => post.meta.tags).flat())
  const paths = Array.from(tags).map(tag => ({ params: { slug: tag } }))

  return {
    paths,
    fallback: false,
  }
}
