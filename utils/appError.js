class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // to find where error occurred
  }
}

module.exports = AppError;
