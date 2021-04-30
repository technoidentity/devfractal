import type { PreInterviewQuiz } from '../../../common/IotsTypes'
import type { TypeOf } from 'io-ts'

export enum Answer {
  a = '0',
  b = '1',
  c = '2',
  d = '3',
}

export const questionsList: TypeOf<typeof PreInterviewQuiz> = {
  topic: 'java',
  questions: [
    {
      question: `What is the output of the following code fragment "int result = 0; \nfor(int i = 0; i < 5; i++) \nresult += i; \nSystem.out.println(result)"`,
      choices: ['10', '15', '20', '25'],
      answer: Answer.a,
    },
    {
      question: 'How do you get the number of elements in an array?',
      choices: ['arr.length()', 'arr.length', 'arr.size()', 'arr.getLength()'],
      answer: Answer.b,
    },
    {
      question: 'For the following code `ArrayList::add(e)` method',
      choices: [
        'adds the value to the end of the list',
        'adds the value to the beginning of the list',
        'at the most appropriate position, based on performance',
        "ArrayList doesn't have `add` method",
      ],
      answer: Answer.a,
    },
    {
      question: 'We can create an array of ints in Java using',
      choices: [
        'new Array<int>(10)',
        'new Array<Integer>(10)',
        'new int[10]',
        'new [10]int',
      ],
      answer: Answer.c,
    },
    {
      question: 'Which of the following is true',
      choices: [
        'ArrayList::get is faster than LinkedList::get',
        'LinkedList::get is faster than ArrayList::get',
        'LinkedList::get and ArrayList::get both fast',
        'It depends on the values they contain',
      ],
      answer: Answer.a,
    },
  ],
}
