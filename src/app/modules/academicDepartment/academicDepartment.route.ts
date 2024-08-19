import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controllers';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicFaculty,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicFaculty);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicFaculty,
);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRouters = router;
