import { string, tuple, TypeOf, type } from 'io-ts'
import { enums } from './enums'

const Choices = tuple([string, string, string, string])

export const Question = type({
  question: string,
  choices: Choices,
  answer: enums('Answer', '0', '1', '2', '3'),
})

export type Question = TypeOf<typeof Question>

export const PreInterviewQuiz = type({
  topic: string,
  questions: tuple([Question, Question, Question, Question, Question]),
})
