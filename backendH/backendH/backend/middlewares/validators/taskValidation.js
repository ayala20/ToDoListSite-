const { taskSchema, taskPutSchema } = require('../../schemas/schemaValidation')

const taskValidation = (task) => {
  const { error } = taskSchema.validate(task)
  if (error) {
    throw error
  }
}

const taskPutValidation = (task) => {
  const { error } = taskPutSchema.validate(task)
  if (error) {
    throw error
  }
}

module.exports = {
  taskValidation,
  taskPutValidation,
}
