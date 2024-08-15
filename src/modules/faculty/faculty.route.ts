import express from 'express';
import { updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controllers';
import validateRequest from '../../app/middleware/validateRequest';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth(USER_ROLE.superAdmin, USER_ROLE.admin), FacultyControllers.deleteFaculty);

router.get('/',   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;