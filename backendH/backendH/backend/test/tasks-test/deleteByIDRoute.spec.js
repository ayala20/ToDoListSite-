const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { ObjectId } = require('mongodb')
const tasksCollectionOperations = getCollectionOperations('tasks')
const { getValidTask } = require('../tasksExamples')

chai.use(chaiHttp)
const expect = chai.expect

describe('DELETE /tasks/:id', () => {
  it('should delete task by ID', async () => {
    const taskId = await tasksCollectionOperations.insertOne(getValidTask())

    expect(
      await tasksCollectionOperations.findOne({ _id: taskId.insertedId })
    ).to.be.an('object')

    const res = await internals.requestor.delete(`/tasks/${taskId.insertedId}`)

    expect(
      await tasksCollectionOperations.findOne({ _id: taskId.insertedId })
    ).to.be.a('null')
    expect(res.status).to.equal(200)
  })
  it('should send error message with status 400, invalid ObjectId', async () => {
    const randomId = 1
    const res = await internals.requestor.delete(`/tasks/${randomId}`)

    expect(res.status).to.equal(400)
  })
  it('should send error message with status 404, not exist id', async () => {
    const randomId = new ObjectId()
    const res = await internals.requestor.delete(`/tasks/${randomId}`)

    expect(res.status).to.equal(404)
  })
})
