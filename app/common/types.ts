export interface Video {
  readonly id: number
  readonly src: string
  readonly title: string
  readonly duration: string
}
export interface Task {
  readonly id: number
  readonly title: string
  readonly description: string
}

export interface Question {
  readonly id: number
  readonly text: string
  readonly option: readonly string[]
  readonly correctAnswer: number
}
export interface User {
  readonly id?: string
  readonly email: string
  readonly score: number
}

export interface QuestionValue {
  readonly question?: string | undefined
  readonly correctAnswer?: string | undefined
  readonly answer?: string | undefined
}
