import express from 'express';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRouters } from '../../modules/user/user.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../../modules/academicFaculty/academicFaculty.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
