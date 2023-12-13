const { StatusCodes } = require('http-status-codes');

class UnAuthorized extends Error {
  statusCode;
  error;

  constructor (message){
    super(message);
    this.message = message;
    this.error = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
} 

module.exports = UnAuthorized;