import fs from 'node:fs'

function closeFiles(fd: number | undefined, fd2?: number) {
  if (fd !== undefined) {
    fs.close(fd, () => {})
  }

  if (fd2 !== undefined) {
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
