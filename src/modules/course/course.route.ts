import express from 'express';
import { CourseValidations } from './course.validation';
import validateRequest from '../../app/middleware/validateRequest';
import { CourseControllers } from './course.controllers';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id',auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.faculty,
  USER_ROLE.student,
), CourseControllers.getSingleCourse);

router.put(
    '/:courseId/assign-faculties',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.assignFacultiesWithCourse,
  );

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
    '/:courseId/remove-faculties',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse,
  );

router.delete('/:id',auth(USER_ROLE.superAdmin, USER_ROLE.admin), CourseControllers.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get('/', auth(
  USER_ROLE.superAdmin,
  USER_ROLE.admin,
  USER_ROLE.faculty,
  USER_ROLE.student,
), CourseControllers.getAllCourses);


router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getFacultiesWithCourse,
);


export const CourseRoutes = router;