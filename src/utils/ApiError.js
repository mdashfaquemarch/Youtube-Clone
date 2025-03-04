class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack) {
      super(message);  // Set message in the built-in Error class
  
      this.statusCode = statusCode;
      this.success = false;
      this.errors = errors;
      this.data = null; // Optional, can be removed if not used
  
      // Capture stack trace only if it's not provided
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, ApiError);
      }
  
      // Ensure proper prototype chain (for extending Error)
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  
  export { ApiError };
  
  