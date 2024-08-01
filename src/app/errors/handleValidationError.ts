import mongoose from 'mongoose';
import { TErrorResponse } from '../interfaces/error';

export const handleValidationError = (err: mongoose.Error.ValidationError) : TErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};
