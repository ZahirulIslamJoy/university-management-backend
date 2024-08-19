import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { semesterValidation } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controllers';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(semesterValidation.createSemesterValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationControllers.getAllSemesterRegistrations,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

// router.delete('/:id', FacultyControllers.deleteFaculty);

// router.get('/', FacultyControllers.getAllFaculties);

export const SemesterRegistrationRoutes = router;
