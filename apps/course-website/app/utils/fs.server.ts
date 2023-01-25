import path from 'path'
import fs from 'fs/promises'

export async function example() {
  const currentFilePath = path.join(
    process.cwd(),
    'app',
    'data',
    'react_day3.md',
  )

  const data = await fs.readFile(currentFilePath, { encoding: 'utf8' })
  return data
}

example()
  .then(() => console.log('done'))
  .catch(console.error)
// `
// ---
// title: Example Post
// published: 2021-02-13
// description: This is some description
// ---

// # Wahoo
// ~~~javascript
// const foo = 10
// console.log('hello world')
// for(const i of [1, 2, 3, 4]) {
//   console.log(i)
// }
// ~~~
// `.trim()
