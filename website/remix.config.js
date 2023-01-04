/** @type {import('@remix-run/dev').AppConfig} */
const { getDependenciesToBundle } = require('@remix-run/dev')

module.exports = {
  ignoredRouteFiles: ['**/.*'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    'remark-gfm',
    /micromark-.*/,
    /mdast-.*/,
    'ccount',
    /unist-.*/,
    'rehype-highlight',
    'hast-util-to-text',
    'mdx-bundler',
    'lowlight',
    'hast-util-is-element',
    'fault',
    'decode-named-character-reference',
    'character-entities',
    'markdown-table',
  ],
}
