import { startSession } from 'mongoose';
import { StudentModel } from './student.models';
import AppError from '../../app/errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findById(id);
  // const result=await StudentModel.aggregate([
  //     {$match:{id:id}}
  // ])
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
    throw new AppError(httpStatus.BAD_REQUEST,"Student is not deleted")
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
