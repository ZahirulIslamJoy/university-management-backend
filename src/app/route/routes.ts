import express from 'express';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRouters } from '../../modules/user/user.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRouters } from '../../modules/academicDepartment/academicDepartment.route';

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
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
