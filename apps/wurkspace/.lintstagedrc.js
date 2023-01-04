module.exports = {
  '**/*.(ts|js)?(x)': filenames =>
    `next lint --fix --file ${filenames
      .map(file => file.split(process.cwd())[1])
      .join(' --file ')}`,
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',
  '**/*.(ts|tsx|js)': filenames => [
    `npx prettier --write ${filenames.join(' ')}`,
  ],
}
