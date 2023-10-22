import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IStudent = {
  fullName: UserName;
  email: string;
  password: string;
  role?: string;
  contactNo: string;
  profileImage?: string;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
