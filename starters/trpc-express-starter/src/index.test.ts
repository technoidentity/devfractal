import { pass, test } from 'tap'

pass('this test is always passing')

test('+', t => {
  t.equal(1 + 2, 3)
  t.end()
})
