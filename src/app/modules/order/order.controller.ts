import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderServices } from './order.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await orderServices.insertIntoDb(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order successfully submitted',
    data: result,
  });
});
const getAllData = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getAllData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});
const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await orderServices.getSingleData(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const orderController = {
  insertIntoDb,
  getAllData,
  getSingleData,
};
