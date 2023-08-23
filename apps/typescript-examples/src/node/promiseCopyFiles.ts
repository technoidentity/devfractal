import { cast } from '@srtp/core'
import type { PathLike } from 'node:fs'
import * as fs from 'node:fs/promises'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

async function cp(src: PathLike, dest: PathLike) {
  return fs
    .open(src, 'r')
    .then(srcFd =>
      fs
        .open(dest, 'w')
        .then(destFd =>
          fs.readFile(srcFd).then(data => fs.writeFile(destFd, data)),
        ),
    )
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  await cp(src, dest)
  console.log('Done!')
}

main().catch(console.error)
