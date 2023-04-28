import { cast } from '@srtp/spec'
import { createReadStream, createWriteStream, type PathLike } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export async function cat(srcDir: string, dest: PathLike) {
  const writer = createWriteStream(dest, { flags: 'a+' })

  const files = await fs.readdir(srcDir)

  for await (const file of files) {
    const rf = path.join(srcDir, file)

    if (!(await fs.stat(rf)).isFile()) {
      continue
    }

    try {
      const reader = createReadStream(rf)
      for await (const chunk of reader) {
        writer.write(chunk)
      }
    } catch (e) {
      console.error(e)
      console.log('Continuing...')
    }
  }
}

const main = async () => {
  invariant(process.argv.length === 4, 'Usage: node cat.js <src> <dest>')

  const [srcDir, dest] = cast(
    z.tuple([z.string(), z.string()]),
    process.argv.slice(2),
  )

  invariant(
    (await fs.stat(srcDir)).isDirectory(),
    'Source directory does not exist',
  )

  await cat(srcDir, dest)

  console.log('Done!')
}

main().catch(console.error)
