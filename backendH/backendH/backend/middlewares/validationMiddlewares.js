const { ObjectId } = require('mongodb')

const bodyValidationMiddleware = (schema) => (req, res, next) => {
  try {
    const { body } = req
    schema(body)

    next()
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

const idValidationMiddleware = () => (req, res, next) => {
  try {
    const id = new ObjectId(req.params.id)
    if (!ObjectId.isValid(id)) {
      res.status(404).send('Task not found')
    } else {
      next()
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

module.exports = {
  bodyValidationMiddleware,
  idValidationMiddleware,
}
