const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { ObjectId } = require('mongodb')
const tasksCollectionOperations = getCollectionOperations('tasks')
const { getValidTask } = require('../tasksExamples')

chai.use(chaiHttp)
const expect = chai.expect

describe('PUT /tasks/:id', () => {
  it('should update a task', async () => {
    const taskId = await tasksCollectionOperations.insertOne(getValidTask())

    const res = await internals.requestor
      .put(`/tasks/${taskId.insertedId}`)
      .send({ taskName: 'a' })

    expect(res.status).to.equal(200)

    const task = await tasksCollectionOperations.findOne({
      id: taskId.insertedId,
    })
    expect(task.content).to.be.equal('a')
  })
  it('should send error message with status 400, invalid task by schema', async () => {
    const taskId = await tasksCollectionOperations.insertOne(getValidTask())

    const res = await internals.requestor
      .put(`/tasks/${taskId.insertedId}`)
      .send({ taskName: true })

    expect(res.status).to.equal(400)
  })
  it('should send error message with status 400, invalid ObjectId', async () => {
    const randomId = 1
    const res = await internals.requestor
      .put(`/tasks/${randomId}`)
      .send(getValidTask())

    expect(res.status).to.equal(400)
  })
  it('should send error message with status 404, not exist id', async () => {
    const randomId = new ObjectId()
    const res = await internals.requestor
      .put(`/tasks/${randomId}`)
      .send(getValidTask())

    expect(res.status).to.equal(404)
  })
})
