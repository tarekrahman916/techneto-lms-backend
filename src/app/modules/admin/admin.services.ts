import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
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
