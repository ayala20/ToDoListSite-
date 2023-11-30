const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { getValidTask } = require('../tasksExamples')
const tasksCollectionOperations = getCollectionOperations('tasks')

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /tasks', () => {
  it('should return all the tasks that exsist in the DB', async () => {
    await tasksCollectionOperations.insertOne(getValidTask())
    await tasksCollectionOperations.insertOne(getValidTask())
    await tasksCollectionOperations.insertOne(getValidTask())

    const res = await internals.requestor.get(`/tasks`)

    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
  })
})
