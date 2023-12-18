import { ICourse } from './course.interface';
import { Course } from './course.model';

const insertIntoDB = async (payload: ICourse): Promise<ICourse | null> => {
  const result = await Course.create(payload);
  return result;
};

const getAllData = async (): Promise<ICourse[]> => {
  const result = await Course.find();
  return result;
};

export const CourseService = {
  insertIntoDB,
  getAllData,
};
