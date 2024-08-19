import { z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...semesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    maxCredit: z.number().optional(),
    minCredit: z.number().optional(),
  }),
});

export const semesterValidation = {
  createSemesterValidationSchema,
};
