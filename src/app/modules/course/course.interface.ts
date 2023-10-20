import { Model } from 'mongoose';

type ICourseModule = {
  name: string;
  link: string;
};

export type ICourseStatus = 'UPCOMING' | 'ONGOING' | 'ENDED';

export type ICourse = {
  title: string;
  description?: string;
  image?: string;
  status: ICourseStatus;
  price: number;
  discountPrice?: number;
  module: ICourseModule[];
};

export type CourseModel = Model<ICourse>;
