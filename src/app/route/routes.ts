import express from 'express';
import { StudentRoutes } from '../../modules/student/student.route';
import { UserRouters } from '../../modules/user/user.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../../modules/academicFaculty/academicFaculty.routes';
import { AcademicDepartmentRouters } from '../../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../../modules/faculty/faculty.route';
import { AdminRoutes } from '../../modules/admin/admin.routes';
import { CourseRoutes } from '../../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../../modules/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../../modules/auth/auth.route';
import { EnrolledCourseRoutes } from '../../modules/enrolledCourse/enrolledCourse.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
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
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/enrolled-course',
    route: EnrolledCourseRoutes
  }, 
  

  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
