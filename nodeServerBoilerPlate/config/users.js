const _ = require('lodash')
const Chance = require('chance')
const chance = new Chance('seed')

// Generates random user data
const range = len => {
  const arr = []
  for (let i = 0; i < len; i += 1) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    id: Math.round(Math.random() * (1000 - 10) + 10),
    selected: false,
    name: chance.name(),
    surveyStatus: statusChance > 0.66 ? 'Pending' : statusChance > 0.33 ? 'Completed' : 'Scheduled',
    type: statusChance > 0.51 ? 'Candidate' : 'Employee',
    location: `${chance.city()}, ${chance.state()}`,
    role: chance.profession(),
  }
}

const makeData = (len = 80) => range(len).map(d => newPerson())

const initialData = makeData()

// NOTE: ignore this for now. But we will need to filter duplicates on the front end.
const userData = [...initialData, ...initialData]

module.exports = {
  // YOUR CODE GOES HERE
  // 1. Make a function to retrieve all Users
  // 2. Make a function to retrieve Users given a string to match against names
  // 3. Make a function to add a new User
}
