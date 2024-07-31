import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

export const adademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty',adademicFacultySchema);
