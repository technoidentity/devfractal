import { Circle, HStack } from '@chakra-ui/react'
import Router from 'next/router'
import React from 'react'
import { BsFillLightningChargeFill, BsPlus } from 'react-icons/bs'

export const ButtonPair = () => {
  return (
    <HStack align="center" m="90px" p="10px">
      <Circle
        size="40px"
        fontSize="20px"
        bg="rgba(96, 91, 255, 1)"
        color="white"
      >
        <BsPlus
          onClick={() => {
            Router.push({
              pathname: '/one-on-one',
            }).catch(err => console.error(err))
          }}
        />
      </Circle>
      <Circle size="40px" bg="rgba(96, 91, 255, 1)" color="white">
        <BsFillLightningChargeFill
          onClick={() => {
            Router.push({
              pathname: '/one-on-one',
            }).catch(err => console.error(err))
          }}
        />
      </Circle>
    </HStack>
  )
}
