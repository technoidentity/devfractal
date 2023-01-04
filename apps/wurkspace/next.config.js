// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      'src/pages',
      'src/ui',
      'src/fun',
      'src/core',
      'src/fake',
      'src/mocks',
      'src/specs',
    ],
  },
  images: {
    domains: ['people.zoho.com', 'contacts.zoho.com'],
  },
}
