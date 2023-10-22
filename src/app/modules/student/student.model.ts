/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IStudent, StudentModel } from './student.interface';

const studentSchema = new Schema<IStudent, StudentModel>(
  {
    fullName: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      default: 'student',
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

studentSchema.pre('save', async function (next) {
  // hashing user password

  const student = this;

  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const Student = model<IStudent, StudentModel>('Student', studentSchema);
