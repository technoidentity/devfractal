import React from 'react'
import { supabase } from '../../common/initSupabase'
import QuestionsForm from '../../components/pre-interview/QuestionsForm'
import { Heading } from '@chakra-ui/react'
import questions from '../../common/questions.json'

const QuestionsList = () => {
  const user = supabase.auth.user()

  if (user) {
    return <QuestionsForm questions={questions} />
  } else {
    return <Heading> Login to continue</Heading>
  }
}

export default QuestionsList
