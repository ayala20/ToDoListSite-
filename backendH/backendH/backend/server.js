const express = require('express')

const routes = require('./routes')
const { connectDB } = require('./DB/db')

const PORT = process.env.PORT

const cors = require('cors')

const createServer = async () => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(routes)

  await connectDB()
  return app
}
const initServer = async (app) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = { createServer, initServer }
