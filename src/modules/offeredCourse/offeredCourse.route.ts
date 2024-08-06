import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseControllers } from './offeredCourse.controllers';

const router = express.Router();


router.post(
  '/create-offered-course',validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
    '/:id',
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
    OfferedCourseControllers.updateOfferedCourse,
  );
  
  router.delete(
    '/:id',
    OfferedCourseControllers.deleteOfferedCourseFromDB,
  );


export const OfferedCourseRoutes = router;
