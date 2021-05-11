import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export interface LinkButtonProps {
  readonly href: string
  readonly title: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, title }) => (
  <Link href={href}>
    <a>
      {' '}
      <Button
        size="sm"
        rounded="md"
        color={['teal.200', 'teal.200', 'teal.900', 'teal.900']}
        bg={['teal.900', 'teal.900', 'teal.200', 'teal.200']}
        _hover={{
          bg: ['teal.600', 'teal.600', 'teal.600', 'teal.600'],
        }}
      >
        {' '}
        {title}
      </Button>{' '}
    </a>
  </Link>
)
