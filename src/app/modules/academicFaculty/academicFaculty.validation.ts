import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body:z.object({
    name: z
    .string({
      invalid_type_error: 'Faculty Name must be string',
    })
  })
});

export const AcademicFacultyValidation = {
    academicFacultyValidationSchema
};
