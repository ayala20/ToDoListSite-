const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { ObjectId } = require('mongodb')
const tasksCollectionOperations = getCollectionOperations('tasks')
const { getValidTask } = require('../tasksExamples')

chai.use(chaiHttp)
const expect = chai.expect

describe('PATCH /tasks/:id', () => {
  it('should toggle the boolean isChecked field', async () => {
    const taskId = await tasksCollectionOperations.insertOne(getValidTask())
    const res = await internals.requestor.patch(`/tasks/${taskId.insertedId}`)
    const task = await tasksCollectionOperations.findOne(taskId.insertedId)

    expect(res.status).to.equal(200)
    expect(task.isChecked).to.equal(true)
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
