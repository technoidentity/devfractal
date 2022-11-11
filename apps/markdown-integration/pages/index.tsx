import { Articles } from "../components/Articles";
import { getAllPosts, PostMeta } from "./src/api";

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <>
      <h1>Articles</h1>
      <Articles posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts().map((post) => post.meta);
  return {
    props: { posts },
  };
}
