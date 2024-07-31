import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body:z.object({
    name: z.string({
      invalid_type_error: 'Faculty Name must be string',
      required_error:"Faculty Name is required"
    }),
    academicFaculty:z.string({
      invalid_type_error:"Academic Faculty must be string",
      required_error:"Academic Faculty is required"
    })
  })
});

export const AcademicDepartmentValidation = {
    academicDepartmentValidationSchema
};