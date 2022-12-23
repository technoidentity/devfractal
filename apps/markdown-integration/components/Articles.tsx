import Link from "next/link";
import { PostMeta } from "../pages/src/api";

interface ArticlesProps {
  posts: PostMeta[];
}

export const Articles = ({ posts }: ArticlesProps) => {
  return (
    <ul>
      {posts.map((post, idx) => {
        return (
          <li key={idx}>
            <div>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </div>
            <p>{post.excerpt}</p>
            <p>
              {post.tags.map((tag) => (
                <Link href={`/tags/${tag}`}>{`     ${tag}`}</Link>
              ))}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
