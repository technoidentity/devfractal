import { Box } from '@/cui'
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from '@/div-table'
import { Blockquote, H1, H2, H3, Paragraph, Ul } from '@/ui/typography'

export function TypographyDemo() {
  return (
    <Box>
      <H1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        The Joke Tax Chronicles
      </H1>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </Paragraph>
      <H2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        The King's Plan
      </H2>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        The king thought long and hard, and finally came up with{' '}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          a brilliant plan
        </a>
        : he would tax the jokes in the kingdom.
      </Paragraph>
      <Blockquote className="mt-6 border-l-2 pl-6 italic">
        "After all," he said, "everyone enjoys a good joke, so it's only fair
        that they should pay for the privilege."
      </Blockquote>
      <H3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </H3>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        The king's subjects were not amused. They grumbled and complained, but
        the king was firm:
      </Paragraph>
      <Ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>1st level of puns: 5 gold coins</li>
        <li>2nd level of jokes: 10 gold coins</li>
        <li>3rd level of one-liners : 20 gold coins</li>
      </Ul>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        As a result, people stopped telling jokes, and the kingdom fell into a
        gloom. But there was one person who refused to let the king's
        foolishness get him down: a court jester named Jokester.
      </Paragraph>
      <H3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Jokester's Revolt
      </H3>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester.
      </Paragraph>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        And then, one day, the people of the kingdom discovered that the jokes
        left by Jokester were so funny that they couldn't help but laugh. And
        once they started laughing, they couldn't stop.
      </Paragraph>
      <H3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        The People's Rebellion
      </H3>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        The people of the kingdom, feeling uplifted by the laughter, started to
        tell jokes and puns again, and soon the entire kingdom was in on the
        joke.
      </Paragraph>
      <Box className="my-6 w-full overflow-y-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>King's Treasury</TableHead>
              <TableHead>People's happiness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Empty</TableCell>
              <TableCell>Overflowing</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Modest</TableCell>
              <TableCell>Satisfied</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Full</TableCell>
              <TableCell>Ecstatic</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      TableHead
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax. Jokester was declared a hero, and
        the kingdom lived happily ever after.
      </Paragraph>
      <Paragraph className="leading-7 [&:not(:first-child)]:mt-6">
        The moral of the story is: never underestimate the power of a good laugh
        and always be careful of bad ideas.
      </Paragraph>
    </Box>
  )
}
