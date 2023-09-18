import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

describe('Accordion', () => {
  test('should toggle the open state when clicked', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Toggle me</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Toggle me too</AccordionTrigger>
          <AccordionContent>More stuff</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )

    const trigger = screen.getByText('Toggle me')

    fireEvent.click(trigger)

    const content = screen.getByText('Content')
    expect(content).toBeVisible()

    fireEvent.click(trigger)

    expect(content).not.toBeVisible()
  })
})
