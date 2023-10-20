/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';

export type IUser = {
  role: string;
  password: string;
  needsPasswordChange: true | false;
  passwordChangedAt?: Date;
  student?: Types.ObjectId;
  admin?: Types.ObjectId;
};
