const { query } = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config();
const uri = process.env.DB_STRING

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const dbName = process.env.DBNAME
const collectionName = process.env.COLLECTIONNAME
let db = null

let dbConnection

const connectDB = async () => {
  if (!dbConnection) {
    try {
      await client.connect()
      console.log('Connected to the database')
      db = client.db(dbName)
    } catch (error) {
      console.error('Error connecting to the database:', error)
    }
  }
  return dbConnection
}

// const createCollection = async () => {
//   try {
//     await client.connect()

//     const database = client.db(dbName)

//     await database.createCollection(collectionName)

//     console.log(`Collection "${collectionName}" created successfully.`)
//   } catch (error) {
//     console.error('Error creating collection:', error)
//   } finally {
//     client.close()
//   }
// }

const getDB = () => {
  return db
}

const getCollection = (collectionName) => {
  return db.collection(collectionName)
}

const getCollectionOperations = (collectionName) => {
  const insertOne = (...props) =>
    getCollection(collectionName).insertOne(...props)
  const deleteOne = (query) => getCollection(collectionName).deleteOne(query)
  const findOne = (query) => getCollection(collectionName).findOne(query)
  const getAll = () => getCollection(collectionName).find({}).toArray()
  const findMany = (query) => etCollection(collectionName).find(query).toArray()
  const updateOne = (query, updateData) =>
    getCollection(collectionName).updateOne(query, { $set: updateData })
  const dropDB = () => getCollection(collectionName).deleteMany({})
  const count = (query) => getCollection(collectionName).count(query)

  return {
    insertOne,
    deleteOne,
    getAll,
    updateOne,
    dropDB,
    findOne,
    count,
    findMany
  }
}

module.exports = {
  client,
  connectDB,
  getDB,
  getCollection,
  getCollectionOperations,
}
