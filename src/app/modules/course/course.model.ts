import { Schema, model } from 'mongoose';
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
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    features: {
      type: [String],
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
