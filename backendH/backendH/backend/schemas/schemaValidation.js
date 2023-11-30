const Joi = require('joi');

const taskSchema = Joi.object({
  id: Joi.alternatives().try(
    Joi.string(),
    Joi.number()
  ).optional(),
  taskName: Joi.string().required(),
  myDate: Joi.date().iso().required(),
  myPriority: Joi.number().min(1).max(10).required(),
  taskSubject: Joi.string().optional(),
  isCompleted: Joi.boolean().default(false),
  taskLocation: Joi.array().required()
});

const taskPutSchema = Joi.object({
  id: Joi.alternatives().try(
    Joi.string(),
    Joi.number()
  ).optional(),
  taskName: Joi.string().optional(),
  myDate: Joi.date().iso().optional(),
  myPriority: Joi.number().min(1).max(10).optional(),
  taskSubject: Joi.string().optional(),
  isCompleted: Joi.boolean().default(false).optional(),
  taskLocation: Joi.array().optional()
});


module.exports = { taskSchema, taskPutSchema}