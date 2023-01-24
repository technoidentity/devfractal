import { Center } from '@mantine/core'
import React from 'react'
import { SculptureList } from '../../../utils/types'
import { CarouselView } from './CauroselView'

interface CarousalProps {
  sculptures: SculptureList
}

export const Carousel = ({ sculptures }: CarousalProps) => {
  const [index, setIndex] = React.useState(0)
  const [showDetails, setShowDetails] = React.useState(false)

  const handleNextClick = () => {
    setIndex(index => (index + 1) % sculptures.length)
  }

  const handleShowDetail = () => {
    setShowDetails(!showDetails)
  }

  return (
    <>
      <CarouselView
        onNextClick={handleNextClick}
        sculpture={sculptures[index]}
        showDetails={showDetails}
        onShowDetails={handleShowDetail}
      />
      <Center>
        {index + 1} of {sculptures.length}
      </Center>
    </>
  )
}
