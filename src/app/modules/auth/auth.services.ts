/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';

const signUp = async (payload: IStudent) => {
  const { email } = payload;

  const isExistInStudentByEmail = await Student.findOne({ email });
  const isExistInAdminByEmail = await Admin.findOne({ email });

  if (isExistInStudentByEmail || isExistInAdminByEmail) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist!');
  }

  const result = await Student.create(payload);
  return result;
};

const login = async (payload: any): Promise<any> => {
  const { email, password }: { email: string; password: string } = payload;

  let isUserExist;

  const admin = await Admin.findOne({ email });
  const student = await Student.findOne({ email });

  if (!admin && !student) {
    throw new Error('User does not exist');
  }

  if (admin || student) {
    isUserExist = admin || student;
  }

  if (isUserExist && !(await bcrypt.compare(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const payloadData = {
    email: isUserExist!.email,
    role: isUserExist!.role,
    phoneNumber: isUserExist!.contactNo,
    fullName: isUserExist!.fullName,
  };

  const accessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const decodedToken = jwtHelpers.decodeToken(token);
  const { email, role, phoneNumber, fullName } = decodedToken;
  if (!email || !role || !phoneNumber || !fullName) {
    throw new Error('Invalid token');
  }

  const admin = await Admin.findOne({
    email,
  });
  const student = await Student.findOne({
    email,
  });

  if (!admin && !student) {
    throw new Error("User doesn't exist");
  }

  const payloadData = {
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  };

  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

export const authServices = {
  signUp,
  login,
  refreshToken,
};
