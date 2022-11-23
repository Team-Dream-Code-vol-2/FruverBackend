const mongoose = require('mongoose')
const ValidationError = mongoose.Error.ValidationError

class ServerErrorHandler extends Error {
  constructor (statusCode, msg) {
    super(msg)
    this.message = msg
    this.statusCode = statusCode
    this.code = statusCode
    Error.captureStackTrace(this, ServerErrorHandler)
  }
}

class ValidationErrorHandler extends Error {
  constructor (error) {
    super('No cumple con las validaciones mínimas')
    this.message = 'No cumple con las validaciones mínimas';
    this.statusCode = 422
    this.code = 422
    const errors = {}
    Object.keys(error.errors).reduce((errors, errorProp) => {
      const { message, value } = error.errors[errorProp]
      errors[errorProp] = { message, value }
      return errors
    }, errors)
    this.errors = errors
    Error.captureStackTrace(this, ServerErrorHandler)
  }
}

/**
 *  Método que permite manejar el error desde el middleware
 * @param {Object} err error del usuario
 * @param {Object} res respuesta a la petición
 * @author Alberto duque <aduque@proyectoholdingvml.com> 2021-03-11
 */
const ErrorHandler = (err, res) => {
  if (err instanceof ValidationError) {
    err = new ValidationErrorHandler(err)
  }
  const { statusCode = 400, message } = err
  const errorJson = { message }
  if (err.errors) {
    errorJson.errors = err.errors
  }
  res.status(statusCode).json(errorJson)
}

module.exports = { ServerErrorHandler, ValidationError, ErrorHandler }
