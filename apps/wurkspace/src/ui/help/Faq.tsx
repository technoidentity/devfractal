export type FaqProps = Readonly<{
  question: string
  answer: string
}>

export const Faq = ({ question, answer }: FaqProps) => (
  <div className="lg:text-sm sm:text-base text-xs p-3 leading-relaxed">
    <h2 className="text-gray-600 font-semibold">Q.&ensp;{question}</h2>
    <h2 className="font-extrabold text-black">A.&ensp;{answer}</h2>
  </div>
)
