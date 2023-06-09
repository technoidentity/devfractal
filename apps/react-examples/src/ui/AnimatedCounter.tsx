'use client'

import { range, reversed, map, pipe } from '@srtp/fn'
import type { MotionValue } from 'framer-motion'
import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const fontSize = 30
const padding = 15
const height = fontSize + padding

export const Counter = ({
  value,
  colorName,
}: {
  value: number
  colorName: string
}) => {
  const numberOfDigits = value.toString().length
  const placeNumber = +`1${'0'.repeat(numberOfDigits)}`

  return (
    <div
      style={{
        fontSize,
        display: 'flex',
        overflow: 'hidden',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        marginLeft: '0.75rem',
        backgroundColor: '#ffffff',
        color: colorName,
        lineHeight: '1',
        borderRadius: '0.25rem',
      }}
    >
      {pipe(
        range(0, numberOfDigits),
        reversed,
        map(index => (
          <Digit
            place={placeNumber / Math.pow(10, numberOfDigits - index)}
            value={value}
            key={index}
          />
        )),
        reversed,
      )}
    </div>
  )
}

const Digit = ({ place, value }: { place: number; value: number }) => {
  const valueRoundedToPlace = Math.floor(value / place)
  const animatedValue = useSpring(valueRoundedToPlace)

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace)
  }, [animatedValue, valueRoundedToPlace])

  return (
    <div
      style={{
        height,
        position: 'relative',
        fontVariantNumeric: 'tabular-nums',
        width: '1ch',
      }}
    >
      {[...Array(10).keys()].map(i => (
        <Num key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  )
}

export const Num = ({ mv, number }: { mv: MotionValue; number: number }) => {
  const y = useTransform(mv, latest => {
    const placeValue = latest % 10
    const offset = (10 + number - placeValue) % 10

    let memo = offset * height

    if (offset > 5) {
      memo -= 10 * height
    }

    return memo
  })

  return (
    <motion.span
      style={{
        y,
        display: 'flex',
        position: 'absolute',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {number}
    </motion.span>
  )
}
