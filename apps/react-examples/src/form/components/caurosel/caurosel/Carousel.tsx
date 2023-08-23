import { Center } from '@mantine/core'
import { state } from '@srtp/react'
import type { SculptureList } from '../../../utils/types'
import { CarouselView } from './CauroselView'

interface CarousalProps {
  sculptures: SculptureList
}

const useCarousel = state(
  { index: 0, showDetails: false },
  {
    next(state, sculpturesLength: number) {
      state.index = (state.index + 1) % sculpturesLength
    },
    toggleShowDetails(state) {
      state.showDetails = !state.showDetails
    },
  },
)

export const Carousel = ({ sculptures }: CarousalProps) => {
  const [{ index, showDetails }, { next, toggleShowDetails }] = useCarousel()

  const handleNextClick = () => {
    next(sculptures.length)
  }

  const handleShowDetail = () => {
    toggleShowDetails()
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
