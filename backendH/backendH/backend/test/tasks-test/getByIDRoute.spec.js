const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { ObjectId } = require('mongodb')
const tasksCollectionOperations = getCollectionOperations('tasks')
const { getValidTask } = require('../tasksExamples')

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /tasks/:id', () => {
  it('should return a task by ID', async () => {
    const taskId = await tasksCollectionOperations.insertOne(getValidTask())

    const res = await internals.requestor.get(`/tasks/${taskId.insertedId}`)

    expect(res.status).to.equal(200)
    expect(res.body._id).to.equal(taskId.insertedId.toString())
  })
  it('should send error message with status 400, invalid ObjectId', async () => {
    const randomId = 1
    const res = await internals.requestor.get(`/tasks/${randomId}`)

    expect(res.status).to.equal(400)
  })
  it('should send error message with status 404, not exist id', async () => {
    const randomId = new ObjectId()
    const res = await internals.requestor.get(`/tasks/${randomId}`)

    expect(res.status).to.equal(404)
  })
})
