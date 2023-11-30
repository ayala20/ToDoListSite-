const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getValidTask, getInvalidTask } = require('../tasksExamples')

chai.use(chaiHttp)
const expect = chai.expect

describe('POST /tasks', () => {
  it('should post a valid task', async () => {
    const res = await internals.requestor.post(`/tasks`).send(getValidTask())

    expect(res.status).to.equal(200)
  })
  it('should send error message with status 400, invalid task by schema', async () => {
    const res = await internals.requestor.post(`/tasks`).send(getInvalidTask())

    expect(res.status).to.equal(400)
  })
})
