// @ts-nocheck

import * as Chakra from '@chakra-ui/react'
import { Image, Table, Td, Thead } from '@chakra-ui/react'

const { Alert, Box, chakra, Kbd, Link } = Chakra

export const MDXComponents = {
  ...Chakra,
  Image: props => (
    <Box my="5">
      <Image
        layout="responsive"
        width={700}
        height={400}
        objectFit="contain"
        {...props}
      />
    </Box>
  ),
  LinkedImage: ({ href, ...props }) => (
    <Link display="block" my="10" href={href} isExternal>
      <MDXComponents.Image {...props} />
    </Link>
  ),
  h1: props => <chakra.h1 apply="mdx.h1" {...props} />,
  h2: props => <chakra.h2 apply="mdx.h2" {...props} />,
  h3: props => <chakra.h3 as="h3" apply="mdx.h3" {...props} />,
  h4: props => <chakra.h4 as="h4" apply="mdx.h4" {...props} />,
  hr: props => <chakra.hr apply="mdx.hr" {...props} />,
  strong: props => <Box as="strong" fontWeight="semibold" {...props} />,

  kbd: Kbd,
  br: ({ reset, ...props }) => (
    <Box
      as={reset ? 'br' : undefined}
      height={reset ? undefined : '24px'}
      {...props}
    />
  ),
  table: Table,
  th: Thead,
  td: Td,
  //   a: Anchor,
  p: props => <chakra.p apply="mdx.p" {...props} />,
  ul: props => <chakra.ul apply="mdx.ul" {...props} />,
  ol: props => <chakra.ol apply="mdx.ul" {...props} />,
  li: props => <chakra.li pb="4px" {...props} />,
  blockquote: props => (
    <Alert
      mt="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      my="1.5rem"
      {...props}
    />
  ),
}
