const express = require('express')
const {
  bodyValidationMiddleware,
  idValidationMiddleware,
} = require('../middlewares/validationMiddlewares')
const {
  taskValidation,
  taskPutValidation,
} = require('../middlewares/validators/taskValidation')
const {
  insertTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTaskById,
  dropDB,
  toggleIsCompleted,
} = require('../handler/taskControllers')

const router = express.Router()

router.post('/', bodyValidationMiddleware(taskValidation), insertTask)

router.get('/:id', idValidationMiddleware(), getTaskById)

router.get('/', getAllTasks)

router.patch('/:id', idValidationMiddleware(), toggleIsCompleted)

router.delete('/:id', idValidationMiddleware(), deleteTaskById)

router.put(
  '/:id',
  idValidationMiddleware(),
  bodyValidationMiddleware(taskPutValidation),
  updateTask
)

router.delete('/', dropDB)

module.exports = router
