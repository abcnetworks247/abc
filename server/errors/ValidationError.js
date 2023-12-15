const { StatusCodes } = require('http-status-codes');

class Validation extends Error {
  statusCode;
  error;

  constructor (message){
    super(message);
    this.error = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.message = message;
  }
} 

module.exports = Validation;