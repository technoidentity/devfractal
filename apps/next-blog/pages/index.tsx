import { Articles } from '../components/Articles'
import type { PostMeta } from '../src/api'
import { getAllPosts } from '../src/api'

// eslint-disable-next-line import/no-default-export
export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <h1>Articles</h1>
      <Articles posts={posts} />
    </>
  )
}

export function getStaticProps() {
  const posts = getAllPosts().map(post => post.meta)
  return {
    props: { posts },
  }
}
