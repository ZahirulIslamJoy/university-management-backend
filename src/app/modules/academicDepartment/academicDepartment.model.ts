import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const adademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

adademicDepartmentSchema.pre('save', async function (next) {
  const isExists = await academicDepartment.findOne({ name: this.name });
  if (isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Department is Alreay Created',
    );
  }
  next();
});

adademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isExists = await academicDepartment.findOne(query);
  if (!isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no academic depertment with this id',
    );
  }
  next();
});

export const academicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  adademicDepartmentSchema,
);
