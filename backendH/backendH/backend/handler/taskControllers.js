const { ObjectId } = require('mongodb')
const { getCollectionOperations } = require('../DB/db')
const tasksCollectionOperations = getCollectionOperations('tasks')
const _ = require('lodash')

const insertTask = async (req, res) => {
  try {
    const { body: task } = req

    if (!_.get(task, 'isCompleted')) {
      task.isCompleted = false
    }
    if (!task._id) {
      task.id = new ObjectId()
    }
    await tasksCollectionOperations.insertOne(task)

    return res.status(200).send(task)
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id

    const query = {
      id: new ObjectId(id),
    }

    const task = await tasksCollectionOperations.findOne(query)

    if (!task) {
      return res.status(404).send('Task not found')
    }

    return res.status(200).send(task)
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasksArr = await tasksCollectionOperations.getAll()

    return res.status(200).send(tasksArr)
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

const updateTask = async (req, res) => {
  try {
    const { body: updatedTask } = req
    const id = req.params.id

    const query = {
      id: new ObjectId(id),
    }

    const task = await tasksCollectionOperations.findOne(query)

    if (!task) {
      return res.status(404).send('Task not found')
    }

    await tasksCollectionOperations.updateOne(query, updatedTask)

    return res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
}

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id

    const query = {
      id: new ObjectId(id),
    }

    const deleteTask = await tasksCollectionOperations.deleteOne(query)

    if (deleteTask.deletedCount === 1) {
      res.status(200).send('task deleted')
    } else {
      res.status(404).send('Task not found')
    }
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

const dropDB = async (req, res) => {
  try {
    await tasksCollectionOperations.dropDB()
    res.status(200).send('All items deleted')
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

const toggleIsCompleted = async (req, res) => {
  try {
    const id = req.params.id

    const query = {
      id: new ObjectId(id),
    }

    const task = await tasksCollectionOperations.findOne(query)
    if (!task) {
      return res.status(404).send('Task not found')
    }
    const updatedIsCompleted = !task.isCompleted

    await tasksCollectionOperations.updateOne(query, {
      isCompleted: updatedIsCompleted,
    })
    res.status(200).send('changed')
  } catch (error) {
    res.status(500).send('An error occurred')
  }
}

module.exports = {
  insertTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTaskById,
  dropDB,
  toggleIsCompleted,
}
