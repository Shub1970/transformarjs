import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errorMessage = "an unknow  error occured";
  let errorDetails;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  if (error.details) {
    errorDetails = error.details;
  }
  res.status(statusCode).json({
    error: {
      message: errorMessage,
      ...(errorDetails && { details: errorDetails }),
    },
  });
};

export default errorHandler;
