import express from 'express';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateRequest';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controllers';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);


export const EnrolledCourseRoutes = router;