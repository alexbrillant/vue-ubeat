export const DEFAULT_MESSAGE = 'Oops an error occured.'
export const DEFAULT_ERROR_CODE = 'DEFAULT_ERROR_CODE'

// Can't take the ES6 class syntaxe, because instanceof won't work.
// The code is from MDN:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
//
function ServiceError (errorCode, message, fileName, lineNumber) {
  if (typeof errorCode === 'undefined') {
    errorCode = DEFAULT_ERROR_CODE
  }
  if (typeof message === 'undefined') {
    message = DEFAULT_MESSAGE
  }
  let instance = new Error(message, fileName, lineNumber)
  instance.errorCode = errorCode
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  return instance
}

ServiceError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

Object.setPrototypeOf(ServiceError, Error)

export default ServiceError
