import React from 'react'

interface ProductIncProps {
  readonly price: number
}

interface CounterProps {
  readonly count: number
  onInc(count: number): void
  onDec(count: number): void
}

export const Counter: React.FC<CounterProps> = ({ count, onInc, onDec }) => {
  return (
    <>
      <button onClick={() => onInc(count)}>+</button>
      <span>{count}</span>
      <button onClick={() => onDec(count)}>-</button>
    </>
  )
}

export const ProductView: React.FC<ProductIncProps> = ({ price }) => {
  return <p>Product:{price}</p>
}

export const ProductInc: React.FC = () => {
  const [count, setCount] = React.useState(1)
  const handleIncrement = (count: number) => {
    setCount(count + 1)
  }
  const handleDecrement = (count: number) => {
    setCount(count - 1)
  }
  const productPrice = 40
  return (
    <>
      <ProductView price={count * productPrice} />
      <Counter count={count} onInc={handleIncrement} onDec={handleDecrement} />
    </>
  )
}
