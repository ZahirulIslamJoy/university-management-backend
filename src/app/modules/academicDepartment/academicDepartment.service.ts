import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartment } from './academicDepartment.model';

const createAcadecDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const isFacultyExists = await AcademicFaculty.findById(
    payload.academicFaculty,
  );
  if (!isFacultyExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This Academic Faculty isnt exists',
    );
  }
  const newDepartment = await academicDepartment.create(payload);
  return newDepartment;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await academicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleDepartmentFromDB = async (id: string) => {
  const result = await academicDepartment
    .findById(id)
    .populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcadecDepartmentIntoDb,
  getAllAcademicDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
