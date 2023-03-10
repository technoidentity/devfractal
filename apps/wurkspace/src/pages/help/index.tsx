import { prisma } from '@core/prisma'
import { ErrorMessage } from '@ui/core'
import { Help } from '@ui/help'
import type { InferGetStaticPropsType } from 'next'
import React from 'react'

export const getStaticProps = async () => {
  const faqs = await prisma.faq.findMany()

  return {
    props: { faqs },
  }
}

const HelpPage = ({ faqs }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!faqs) {
    return <ErrorMessage error={'Faqs Not Found'} />
  }

  return <Help faqs={faqs} />
}

HelpPage.isPublic = true

export default HelpPage
