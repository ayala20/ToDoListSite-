const express = require('express')
const router = express.Router()

const tasksRoutes = require('./tasks')

router.get('/time', (req, res) => res.send(new Date()))

router.get('/isAlive', (req, res) => {
  res.status(200).send('Server is alive')
})

router.use('/tasks', tasksRoutes)


module.exports = router
