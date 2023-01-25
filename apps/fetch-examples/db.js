const Chance = require('chance')

const chance = new Chance()

module.exports = () => {
  const todos = []
  for (let i = 0; i < 750; i += 1) {
    todos.push({
      id: i,
      title: chance.sentence({ words: chance.pickone([3, 4, 5, 6]) }),
      completed: chance.bool(),
    })
  }
  return { todos }
}
