class ApiError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Identifies operational errors vs. programming bugs
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export {ApiError}
  