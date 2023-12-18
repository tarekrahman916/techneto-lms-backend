import { Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';

export type IOrderStatus = 'pending' | 'active' | 'rejected';

export type IOrder = {
  email: string;
  course: Types.ObjectId | ICourse;
  status: IOrderStatus;
  tnrxId: string;
  paymentMethod: string;
};

export type OrderModel = Model<IOrder>;
