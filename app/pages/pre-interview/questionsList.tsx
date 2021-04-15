import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { supabase } from '../../common/initSupabase'
import type { Question } from '../../common/types'
import QuestionsForm from '../../components/pre-interview/QuestionsForm'
import { Heading } from '@chakra-ui/react'

interface QuestionsListProps {
  readonly questions: readonly Question[]
}

export const getServerSideProps: GetServerSideProps<QuestionsListProps> = async () => {
  const res = await fetch('http://localhost:3000/api/questions/questions')
  const questions = await res.json()
  if (!questions) {
    return {
      notFound: true,
    }
  }
  return { props: { questions } }
}

const QuestionsList: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ questions }) => {
  const user = supabase.auth.user()

  if (user) {
    return <QuestionsForm questions={questions} />
  } else {
    return <Heading> Login to continue</Heading>
  }
}

export default QuestionsList
