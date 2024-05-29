import express from 'express';
import { StudentRoutes } from '../config/modules/student/student.route';
import { UserRouters } from '../config/modules/user/user.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
