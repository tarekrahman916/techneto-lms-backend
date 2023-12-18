import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const insertIntoDb = async (payload: IOrder): Promise<IOrder> => {
  const isExist = await Order.findOne({
    email: payload.email,
    courseId: payload.course,
  });

  const isExistPayment = await Order.findOne({
    email: payload.email,
    tnrxId: payload.tnrxId,
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already purses this course'
    );
  }
  if (isExistPayment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You have already used this transaction id.Please submit valid transaction id'
    );
  }
  const result = await Order.create(payload);
  return result;
};

const getAllData = async (): Promise<IOrder[]> => {
  const result = await Order.find();
  return result;
};

const getSingleData = async (email: string): Promise<IOrder[]> => {
  const result = await Order.find({ email })
    .populate({
      path: 'course',
      select: 'title',
    })
    .select({ tnrxId: true, email: true, paymentMethod: true, status: true });
  return result;
};

export const orderServices = {
  insertIntoDb,
  getAllData,
  getSingleData,
};
