import fs from 'node:fs'

import { isDefined } from '@srtp/core'

function closeFiles(fd: number | undefined, fd2?: number) {
  if (isDefined(fd)) {
    fs.close(fd, () => {})
  }

  if (isDefined(fd2)) {
    fs.close(fd2, () => {})
  }
}

export function cp(
  src: fs.PathLike,
  dest: fs.PathLike,
  cb: (err: NodeJS.ErrnoException | undefined) => void,
) {
  fs.open(src, 'r', (err, srcFd) => {
    if (err) {
      return cb(err)
    }

    fs.open(dest, 'w', (err, destFd) => {
      if (err) {
        closeFiles(srcFd)
        return cb(err)
      }

      fs.readFile(srcFd, (err, data) => {
        if (err) {
          closeFiles(srcFd)
          return cb(err)
        }

        fs.writeFile(destFd, data, err => {
          if (err) {
            closeFiles(srcFd, destFd)
            return cb(err)
          }

          closeFiles(srcFd, destFd)
          cb(undefined)
        })
      })
    })
  })
}
