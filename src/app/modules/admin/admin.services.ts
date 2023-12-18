import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Student } from '../student/student.model';
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const { email } = payload;

  const isExistInStudentByEmail = await Student.findOne({ email });
  const isExistInAdminByEmail = await Admin.findOne({ email });

  if (isExistInStudentByEmail || isExistInAdminByEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist!');
  }

  const result = await Admin.create(payload);
  return result;
};

const getAllAdmin = async (): Promise<IAdmin[]> => {
  const result = await Admin.find();
  return result;
};

export const adminServices = {
  createAdmin,
  getAllAdmin,
};
