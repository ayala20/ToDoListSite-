const chai = require('chai')
const chaiHttp = require('chai-http')
const { client } = require('../DB/db')
const { createServer } = require('../server')

chai.use(chaiHttp)

const internals = {}

before(async () => {
  const server = await createServer()
  internals.requestor = chai.request.agent(server)
  await client.connect()
})

beforeEach(() => {
  internals.testCollection = client
    .db(process.env.DBNAME)
    .collection(process.env.COLLECTIONNAME)
})

afterEach(async () => {
  await client.db(process.env.DBNAME).dropDatabase()
})

after(async () => {
  await client.close()
})

module.exports = { internals }
