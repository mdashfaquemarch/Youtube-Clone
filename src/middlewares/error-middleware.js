import fs from 'fs'
const errorHandler = (err, req, res, next) => {
  // Log error only in development mode
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  // 🛑 Delete uploaded files if an error occurs
  if (req.files) {
    Object.values(req.files)
      .flat()
      .forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
  }

  let { statusCode = 500, message = "Something went wrong", errors = [] } = err;

  // 🔹 Handle Mongoose Validation Errors (e.g., missing required fields)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((el) => el.message);
  }

  // 🔹 Handle Mongoose Duplicate Key Errors (e.g., unique constraint violation)
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
    errors = [`${Object.keys(err.keyValue).join(", ")} must be unique`];
  }

  // 🔹 Handle Mongoose Cast Errors (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errors = [`Invalid value for ${err.path}`];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
  });
};

export default errorHandler;
