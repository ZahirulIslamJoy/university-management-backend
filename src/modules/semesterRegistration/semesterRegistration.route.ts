import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { semesterValidation } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controllers';

const router = express.Router();

// router.get('/:id', FacultyControllers.getSingleFaculty);

router.post(
  '/create-semester-registration',validateRequest(semesterValidation.createSemesterValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

// router.delete('/:id', FacultyControllers.deleteFaculty);

// router.get('/', FacultyControllers.getAllFaculties);

export const SemesterRegistrationRoutes = router;
