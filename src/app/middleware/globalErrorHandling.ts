import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interfaces/error';
import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const handleError: ErrorRequestHandler = (err, req, res, next) => {
  //setting default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    statusCode = 400;
    const errorSources :TErrorSources = err.issues.map((issue:ZodIssue) => {
      return {
        path:issue?.path[issue?.path.length-1],
        message:issue.message
      };
    });
    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError= handleZodError(err);
    message=simplifiedError.message;
    statusCode=simplifiedError.statusCode;
    errorSources=simplifiedError.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.NODE_ENV==="development"?  err?.stack : null
  });
};

export default handleError;
