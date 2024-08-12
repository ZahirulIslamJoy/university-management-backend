import express from 'express';;
import { AuthValidation } from './auth.validation';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthControllers } from './auth.controllers';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

export const AuthRoutes = router;