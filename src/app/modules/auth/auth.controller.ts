/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from '../student/student.interface';
import { authServices } from './auth.services';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authServices.signUp(payload);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully Signup your account!',
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log(payload);
  const result = await authServices.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const result = await authServices.refreshToken(token!);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token refreshed successfully!',
    data: result,
  });
});

export const authController = {
  signUp,
  login,
  refreshToken,
};
