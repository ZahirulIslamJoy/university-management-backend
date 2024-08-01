import { ZodError, ZodIssue } from "zod";
import { TErrorResponse, TErrorSources } from "../interfaces/error";

export const handleZodError = (err: ZodError) : TErrorResponse => {
   const statusCode = 400;
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