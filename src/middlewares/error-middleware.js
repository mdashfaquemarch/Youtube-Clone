
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log error for debugging

  // Default values for unknown errors
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  if (!message) message = 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Show stack trace only in development
  });
};

export default errorHandler;
