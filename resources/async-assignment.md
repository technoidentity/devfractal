You are free to use async/await and/or promise then/catch chains for the
following programs.

For learning about fetch and fetch based libraries read
[safe data fetching](https://www.builder.io/blog/safe-data-fetching).

You could use [zod](https://www.totaltypescript.com/tutorials/zod) for response
validation.

Go through [json-server](https://github.com/typicode/json-server) to know about
HTTP APIs.

1.  Use [json placeholder](https://jsonplaceholder.typicode.com/guide/) and
    implement the following functions

    a. `getPosts(): Post[]`: fetch all posts

    b. `getPost(postId: number): Post`: fetch a single post

    c. `getComments(postId: number): Comment[]`: fetch all comments for the post
    with the given id

    d. `getPosts(...postIds: number[]): Post[]`: fetch all posts in parallel.
    You will need multiple calls to the API to implement this function.

    e. `createPost(post: Omit<Post, 'id'>): Post`: create a new post

    f. `updatePost(post: Post): Post`: update an existing post

    g. `deletePost(postId: number): void`: delete a post

    h. `getComments(userId: number)` all comments of all posts by the user. You
    will need multiple calls to the API to implement this function. Handler
    errors properly.

2.  Write a function `delay` to delay the execution of a function by a given
    number of milliseconds.

    ```typescript
    function delay(ms: number): Promise<void>
    ```

3.  write a function `delay` to delay the execution of a function by a given
    number of milliseconds, and return provided value.

    ```typescript
    function delayedSuccess<T>(ms: number, value: T): Promise<T>
    ```

4.  Write a function `delayedFail` to delay the execution of a function by a
    given number of milliseconds, and throw an error with provided message.

    ```typescript
    function delayedFail(ms: number, message: string): Promise<never>
    ```

5.  Write a function to either fetch a value from the given url within `ms`
    milliseconds or return back a rejected promise.

    ```typescript
    function fetchTimeout(url: string, ms: number): Promise<string>
    ```
