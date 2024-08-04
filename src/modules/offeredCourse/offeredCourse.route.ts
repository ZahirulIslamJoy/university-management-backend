import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controllers';

const router = express.Router();


router.post(
  '/create-offered-course',validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

// router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);

// router.get(
//     '/:id',
//     SemesterRegistrationControllers.getSingleSemesterRegistration,
//   );

//   router.patch(
//     '/:id',
//     SemesterRegistrationControllers.updateSemesterRegistration,
//   );


export const OfferedCourseRoutes = router;
