import mongoose from 'mongoose';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
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
