/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  fullName: UserName;
  email: string;
  password: string;
  role: string;
  contactNo: string;
  profileImage?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
