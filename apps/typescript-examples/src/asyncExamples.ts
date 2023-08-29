import { Natural, checked } from '@srtp/core'
import { http } from '@srtp/web'
import invariant from 'tiny-invariant'
import { z } from 'zod'
export const delay = checked([Natural], ms => {
  invariant(ms >= 0, 'ms must be greater than or equal to 0')

  return new Promise<void>(resolve => setTimeout(resolve, ms))
})

export const successDelay = <T>(ms: number, value: T): Promise<T> =>
  delay(ms).then(() => value)

export const failureDelay = <T>(ms: number, message: string): Promise<T> =>
  delay(ms).then(() => {
    throw new Error(message)
  })

export const timedFetch = <T>(ms: number, url: string): Promise<T> =>
  Promise.race([failureDelay(ms, 'timed out'), http.get$(url)]) as Promise<T>

const Post = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
})
type Post = z.infer<typeof Post>

const Posts = z.array(Post)
type Posts = Readonly<z.infer<typeof Posts>>

export const getPosts = () =>
  http.get(Posts, 'https://jsonplaceholder.typicode.com/posts')

export const getPost = (id: number) =>
  http.get(Post, `https://jsonplaceholder.typicode.com/posts/${id}`)

export const getComments = (userId: number) =>
  http.get(
    Comments,
    `https://jsonplaceholder.typicode.com/posts/${userId}/comments`,
  )

export const getPostsIds = (...ids: number[]): Promise<Posts> =>
  Promise.all(ids.map(getPost))

export const createPost = (post: Omit<Post, 'id'>) =>
  http.post(Post, 'https://jsonplaceholder.typicode.com/posts', post)

export const updatePost = (id: number, post: Partial<Post>) =>
  http.patch(Post, `https://jsonplaceholder.typicode.com/posts/${id}`, post)

export const replacePost = (id: number, post: Post) =>
  http.put(Post, `https://jsonplaceholder.typicode.com/posts/${id}`, post)

export const deletePost = async (id: number): Promise<void> => {
  await http.del$(`https://jsonplaceholder.typicode.com/posts/${id}`)
}

const Comment = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
})
type Comment = z.infer<typeof Comment>
const Comments = z.array(Comment)
type Comments = Readonly<z.infer<typeof Comments>>

export const getCommentsByUserId = async (
  userId: number,
): Promise<Comments> => {
  const userPosts = await http.get(
    Posts,
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  )

  const comments = await Promise.all(
    userPosts.map(post =>
      http.get(
        Comments,
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
      ),
    ),
  )

  return comments.flat()
}
