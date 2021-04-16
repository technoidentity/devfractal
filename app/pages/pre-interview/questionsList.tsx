import React from 'react'
import { supabase } from '../../common'
import { Heading } from '@chakra-ui/react'
import questions from '../../common/questions.json'
import { QuestionsForm } from '../../components/pre-interview'

const QuestionsList = () => {
  const user = supabase.auth.user()

  if (user) {
    return <QuestionsForm questions={questions} />
  } else {
    return <Heading> Login to continue</Heading>
  }
}

export default QuestionsList
