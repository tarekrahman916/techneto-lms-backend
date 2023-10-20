import express from 'express';
import { CourseRoutes } from '../modules/course/course.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/courses',
    route: CourseRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
