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
  price: number;
  discountPrice?: number;
  features: string[];
  module: ICourseModule[];
};

export type CourseModel = Model<ICourse>;
