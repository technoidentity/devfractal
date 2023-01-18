import { Heading } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import questions from '../../common/questions.json'
import { QuestionsForm } from '../../components/pre-interview'

const QuestionsList = () => {
  const user = useUser()

  if (user) {
    return <QuestionsForm questions={questions} />
  } else {
    return <Heading> Login to continue</Heading>
  }
}

export default QuestionsList
