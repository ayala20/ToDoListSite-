const chai = require('chai')
const chaiHttp = require('chai-http')
const { internals } = require('../index.spec')
const { getCollectionOperations } = require('../../db')
const { getValidTask } = require('../tasksExamples')
const tasksCollectionOperations = getCollectionOperations('tasks')

chai.use(chaiHttp)
const expect = chai.expect

describe('Task tests:', () => {
  describe('DELETE /tasks', () => {
    it('should drop DB', async () => {
      await tasksCollectionOperations.insertOne(getValidTask())
      await tasksCollectionOperations.insertOne(getValidTask())
      await tasksCollectionOperations.insertOne(getValidTask())

      expect(await tasksCollectionOperations.getAll()).to.be.an('array')

      const res = await internals.requestor.delete(`/tasks`)

      expect(res.status).to.equal(200)
      expect(await tasksCollectionOperations.count()).to.equal(0)
    })
  })
})
