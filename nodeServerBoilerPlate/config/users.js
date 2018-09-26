'use strict';

const _ = require('lodash')
const Chance = require('chance')
const chance = new Chance('seed')

// Generates random user data
const _range = len => {
  const arr = []
  for (let i = 0; i < len; i += 1) {
    arr.push(i)
  }
  return arr
}

const _newPerson = () => {
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

const makeData = (len = 80) => _range(len).map(d => _newPerson())

module.exports = makeData;
