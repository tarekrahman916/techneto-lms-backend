import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { adminServices } from './admin.services';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await adminServices.createAdmin(payload);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin successfully created',
    data: result,
  });
});
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.getAllAdmin();

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin successfully Fetched',
    data: result,
  });
});

export const adminController = {
  createAdmin,
  getAllAdmin,
};
