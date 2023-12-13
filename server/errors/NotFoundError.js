const { StatusCodes } = require('http-status-codes');

class Notfound extends Error {
  statusCode;
  error;

  constructor(message) {
    super(message);
    this.error = message;
    this.statusCode = StatusCodes.NOT_FOUND;
    this.message = message;
  }
}

module.exports = Notfound;