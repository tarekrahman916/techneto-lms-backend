import { Schema, model } from 'mongoose';
import { courseStatus } from './course.constants';
import { CourseModel, ICourse } from './course.interface';

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: courseStatus,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    module: [
      {
        name: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export const Course = model<ICourse, CourseModel>('Course', courseSchema);
