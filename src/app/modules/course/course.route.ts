import express from 'express';
import { CourseController } from './course.controller';
const router = express.Router();

router.get('/', CourseController.getAllData);

router.post('/', CourseController.insertIntoDB);

export const CourseRoutes = router;
