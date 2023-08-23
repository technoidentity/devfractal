import { cast } from '@srtp/core'
import fs from 'node:fs'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

export function scp(src: fs.PathLike, dest: fs.PathLike) {
  let sfd: number | undefined
  let dfd: number | undefined

  try {
    const sfd = fs.openSync(src, 'r')
    const dfd = fs.openSync(dest, 'w')

    const data = fs.readFileSync(sfd)
    fs.writeFileSync(dfd, data)
  } finally {
    if (sfd) {
      fs.closeSync(sfd)
    }
    if (dfd) {
      fs.closeSync(dfd)
    }
  }
}

const main = () => {
  invariant(argv.length === 3, 'Usage: node scp.js <src> <dest>')
  const [src, dest] = cast(z.tuple([z.string(), z.string()]), argv.slice(1))

  scp(src, dest)
  console.log('Done!')
}

main()
