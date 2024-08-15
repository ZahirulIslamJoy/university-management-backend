/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import express, { NextFunction } from 'express';
import { UserControllers } from './user.controllers';
import validateRequest from '../../app/middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';
import { upload } from '../../app/utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin ,USER_ROLE.superAdmin ),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data );
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  //auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  UserControllers.getMe,
);

export const UserRouters = router;
