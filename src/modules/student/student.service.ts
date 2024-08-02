import { startSession } from 'mongoose';
import { StudentModel } from './student.models';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Student } from './student.interface';
import QueryBuilder from '../../bulilder/QueryBuilder';
import { excludeFields, studentSearchableFields } from './student.constants';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }

  //  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // const searchQuery = StudentModel.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((item) => delete queryObj[item]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // let limit = 5;
  // let skip = 0;
  // let page = 1;
  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v';
  // if (query?.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldsQuery = await limitQuery.select(fields);

  // return fieldsQuery;

  const studentQuery= new QueryBuilder(StudentModel.find(),query).search(studentSearchableFields).filter(excludeFields).sort().paginate().fields()
  const result = studentQuery.modelQuery
  return result

};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id);
  // const result=await StudentModel.aggregate([
  //     {$match:{id:id}}
  // ])
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<Student>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedData: Record<string, unknown> = { remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await StudentModel.findByIdAndUpdate({ id }, modifiedData, {
    new: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const sesssion = await startSession();
  try {
    sesssion.startTransaction();
    //transaction-1
    const result = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, sesssion },
    );
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student is not deleted');
    }
    //transaction-2
    const deleteUserResult = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, sesssion },
    );
    if (!deleteUserResult) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User is not deleted');
    }
    await sesssion.commitTransaction();
    await sesssion.endSession();
    return result;
  } catch (err) {
    sesssion.abortTransaction();
    await sesssion.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Student is not deleted');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
