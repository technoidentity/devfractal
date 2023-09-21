import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'

type ColorPickerProps = {
  color: string
}

export const ColorPicker = ({ color }: ColorPickerProps) => {
  return (
    <Box pt={6} pb={2}>
      <Slider
        aria-label="slider-ex-1"
        w="400px"
        defaultValue={35}
        colorScheme={color}
        // eslint-disable-next-line no-console
        onChange={console.log}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}
